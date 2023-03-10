/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { loadEnvFile, setupEnv } = require('./common');

(async function () {
  const { argv, platform } = process;

  if (platform !== 'darwin') {
    console.log('This script is only for macOS');
    return;
  }
  await setupEnv(argv[2]);
  const envJson = await loadEnvFile();
  const simulator = 'iPhone 11';
  try {
    // if simulator is not booted, it will throw an error
    execSync(`xcrun simctl list devices | grep "${simulator}" | grep "Booted"`);
  } catch {
    execSync(`xcrun simctl boot "${simulator}"`);
  }

  // uninstall app using xcrun
  execSync(`xcrun simctl uninstall booted "${envJson.BUNDLE_IDENTIFIER}"`);
  execSync(
    `npx react-native run-ios --scheme ${envJson.APP_PLACEHOLDER_NAME}-${envJson.APP_ENV} --simulator="${simulator}"`,
    { stdio: 'inherit' },
  );
})();
