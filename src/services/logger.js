class Logger {
  static isDebugEnabled = false;

  static enableDebug() {
    this.isDebugEnabled = true;
  }

  static info(args) {
    console.info(args);
  }

  static log(args) {
    console.log(args);
  }

  static debug(args) {
    if (!this.isDebugEnabled) {
      return;
    }
    console.debug(args);
  }

  static error(args) {
    console.error(args);
  }
}

module.exports = Logger;
