const { spawn } = require('child_process');

const runScript = async (command, args, Logger = console) => {
  Logger.debug('Running script...');

  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    let scriptOutput = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
      Logger.debug(`stdout: ${data}`);

      data = data.toString().trimStart().trimEnd();
      scriptOutput += data;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
      Logger.debug(`stderr: ${data}`);

      data = data.toString().trimStart().trimEnd();
      scriptOutput += data;
    });

    child.on('error', (error) => {
      Logger.error(error.message);
      reject();
    });

    child.on('close', (code) => {
      Logger.debug('Process Finished.');
      Logger.debug(`Closing code: ${code}`);
      resolve({
        output: scriptOutput,
        exitCode: code
      });
    });
  });
};

module.exports = runScript;
