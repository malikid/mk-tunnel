const inquirer = require('inquirer');
const fs = require('fs');
const { getInstanceConfig } = require('./helpers');
const { CONFIG_PATH } = require('../configs');

module.exports = async (Logger) => {
  const config = await getInstanceConfig(Logger);

  const questions = [
    {
      type: 'input',
      name: 'instanceIp',
      message: 'Enter AWS EC2 instance IP or DNS:',
      default: config && config.instanceIp
    },
    {
      type: 'input',
      name: 'instanceAccessKeyPath',
      message: 'Enter the path of your access key (.pem):',
      default: config && config.instanceAccessKeyPath
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Save changes?'
    }
  ];

  const answers = await inquirer.prompt(questions);
  const { confirm, ...rest } = answers;

  if (confirm) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(rest, null, 4));
    Logger.info(`Configurations are saved to ${CONFIG_PATH}`);
  }
  return answers;
};
