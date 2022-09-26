const childProcess = require('node:child_process');

function green(text) {
  return `\x1b[32m${text}\x1b[0m`;
}

function main() {
  childProcess.execFile('git', ['pull', '--all'], (error, _stdout, _stderr) => {
    if (error) {
      throw error;
    }
    const TIME = new Date();
    const YEAR = TIME.getFullYear();
    const MONTH =
      TIME.getMonth() < 10 ? '0' + (TIME.getMonth() + 1) : TIME.getMonth() + 1;
    const DAY = TIME.getDate() < 10 ? '0' + TIME.getDate() : TIME.getDate();
    const HOUR = TIME.getHours();
    const MINUTE = TIME.getMinutes();
    const SECOND = TIME.getSeconds();
    const formatTime = `${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:${SECOND}`;
    console.log(`  ${formatTime} ${green('[INFO]')} Finished: git pull -all`);
  });
}

main();
