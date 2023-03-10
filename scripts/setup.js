// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

(function () {
  execSync('yarn patch-package', { stdio: 'inherit' });
  execSync('mkdir -p android/app/src/main/assets', {
    stdio: 'inherit',
  });
  execSync('cp -r src/app/assets/fonts android/app/src/main/assets', {
    stdio: 'inherit',
  });
  console.log(
    '                  π§Άπ§Άπ§Άπ§Άπ§Ά Link font Android done!! π§Άπ§Άπ§Άπ§Άπ§Ά',
  );
  if (process.platform === 'darwin') {
    execSync('cd ios && touch tmp.xcconfig');
    console.log(
      '                  βοΈβοΈβοΈβοΈβοΈ Starting bundle install!! β³β³β³β³β³',
    );
    execSync('bundle install', {
      stdio: 'inherit',
    });
    console.log(
      '                  π―π―π―π―π― Bundle install done!! π―π―π―π―π―',
    );
    console.log(
      '                  βοΈβοΈβοΈβοΈβοΈ Starting pod install!! β³β³β³β³β³',
    );
    execSync('bundle exec pod install --project-directory=ios', {
      stdio: 'inherit',
    });
    console.log('                      π₯π₯π₯π₯π₯ Pod done!!! π₯π₯π₯π₯π₯');
  }
})();
