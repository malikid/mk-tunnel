const { program } = require('commander');
const { name, version, description } = require('../package.json');
const interactive = require('./utils/interactive');
const { getAvailablePorts, setupTunnel } = require('./utils/remoteOperations');
const Logger = require('./services/logger');
const { getConfigurationsWithChecks } = require('./utils/helpers');

program.name(name).description(description).version(version);

program
  .command('init')
  .description(`Inits configurations for ${name}`)
  .action(async () => {
    Logger.info('Gathering information...');
    await interactive(Logger);
  });

program
  .command('port')
  .description('Check port status')
  .option('--debug')
  .action((str, options) => {
    if (options.debug) {
      Logger.enableDebug();
    }

    getAvailablePorts(Logger);
  });

program
  .command('start')
  .description('Start the tunnel')
  .argument('<string>', 'port to expose to public')
  .option('-p, --port')
  .option('--debug')
  .action(async (string, options) => {
    if (options.debug) {
      Logger.enableDebug();
    }
    if (options.port) {
      const { instanceIp, instanceAccessKeyPath } =
        await getConfigurationsWithChecks(Logger);
      const portToExpose = parseInt(string);
      const availablePorts = await getAvailablePorts({
        instanceIp,
        instanceAccessKeyPath,
        Logger
      });
      const remotePortToUse =
        availablePorts[Math.floor(Math.random() * availablePorts.length)];
      Logger.debug({ portToExpose, availablePorts, remotePortToUse });
      setupTunnel({
        instanceIp,
        instanceAccessKeyPath,
        remotePortToUse,
        portToExpose,
        Logger
      });
      Logger.info(
        `${instanceIp}:${remotePortToUse} =====> localhost:${portToExpose} Ready!`
      );
    }
  });

program.parse();
