const fs = require('fs').promises;
const { existsSync } = require('fs');
const { CONFIG_DIR, CONFIG_PATH } = require('../configs');

const getInstanceConfig = async (Logger) => {
  try {
    const isFileExists = existsSync(CONFIG_PATH);
    if (isFileExists) {
      const config = await fs.readFile(CONFIG_PATH, 'utf8');
      return JSON.parse(config);
    }
    await fs.mkdir(CONFIG_DIR);
    return null;
  } catch (err) {
    Logger.error(err);
    return null;
  }
};

const getConfigurationsWithChecks = async (Logger) => {
  const config = await getInstanceConfig(Logger);
  if (!config) {
    Logger.error(`No configuration found. Please run "mk-tunnel init" first.`);
    process.exit(1);
    return;
  }
  const { instanceIp, instanceAccessKeyPath } = config;
  if (!instanceIp || !instanceAccessKeyPath) {
    Logger.error(
      `Some configurations are missing. Please run "mk-tunnel init" first.`
    );
    process.exit(1);
    return;
  }
  return config;
};

const getPortFromUrl = (url) => url.substring(url.lastIndexOf(':') + 1);

const getUsedPortsByParsingOutput = (output) => {
  const usedPortSet = new Set();
  const lines = output.split(/\n/);

  lines.forEach((entry) => {
    if (!entry) {
      return;
    }

    entry = entry
      .replace(/^\s\s*/, '')
      .replace(/\r/, '')
      .split(/[ ]+/);

    if (entry[0].startsWith('tcp')) {
      // tcp  0  0  0.0.0.0:5000  0.0.0.0:*  LISTEN  1438/sshd: ec2-user
      // tcp6 0  0  :::5000       :::*       LISTEN  1438/sshd: ec2-user
      // entry[3] = remort ip + port
      // entry[6] = pid/sshd
      usedPortSet.add(parseInt(getPortFromUrl(entry[3])));
    }
  });

  return [...usedPortSet];
};

module.exports = {
  getInstanceConfig,
  getConfigurationsWithChecks,
  getUsedPortsByParsingOutput
};
