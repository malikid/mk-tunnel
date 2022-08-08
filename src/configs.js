const HOME_DIR = require('os').homedir();
const { name } = require('../package.json');

const CONFIG_DIR = `${HOME_DIR}/.${name}`;
const CONFIG_PATH = `${CONFIG_DIR}/config.json`;

const PORT_LIST = [
  1111, 1234, 1987, 2222, 2266, 3000, 3333, 4000, 5000, 8000, 8080
];

module.exports = {
  CONFIG_DIR,
  CONFIG_PATH,
  PORT_LIST
};
