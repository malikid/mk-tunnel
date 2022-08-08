const runScript = require('./exec');
const { getUsedPortsByParsingOutput } = require('./helpers');
const { PORT_LIST } = require('../configs');

const getAvailablePorts = async ({
  instanceIp,
  instanceAccessKeyPath,
  Logger = console
}) => {
  const { output, exitCode } = await runScript(
    'ssh',
    [
      '-i',
      instanceAccessKeyPath,
      `ec2-user@${instanceIp}`,
      'sudo netstat -tulpn | grep "sshd: ec2-user"'
    ],
    Logger
  );

  if (output.length !== 0) {
    Logger.info('[REMOTE]', output);
  }

  // if(exitCode !== 0) {
  //   Logger.error(output);
  //   // process.exit(1);
  // }

  const usedPorts = getUsedPortsByParsingOutput(output);
  Logger.debug('usedPorts', usedPorts);

  const availblePorts = PORT_LIST.filter((x) => !usedPorts.includes(x));

  if (availblePorts.length == 0) {
    Logger.error('No available port now. Please try again later.');
    process.exit(1);
    return;
  }

  Logger.debug(`Ports ${availblePorts.join(', ')} are available.`);
  return availblePorts;
};

const setupTunnel = async ({
  instanceIp,
  instanceAccessKeyPath,
  remotePortToUse,
  portToExpose,
  Logger = console
}) => {
  const { output, exitCode } = await runScript(
    'ssh',
    [
      '-N',
      '-i',
      instanceAccessKeyPath,
      `ec2-user@${instanceIp}`,
      '-R',
      `${remotePortToUse}:localhost:${portToExpose}`
    ],
    Logger
  );

  if (output) {
    Logger.info('[REMOTE]', output);
  }
};

module.exports = {
  getAvailablePorts,
  setupTunnel
};
