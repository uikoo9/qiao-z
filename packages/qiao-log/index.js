'use strict';

var log4js = require('log4js');

// log4js

// logger
let logger;

/**
 * get logger
 * @param {*} options
 * @returns
 */
const getLogger = (options) => {
  // check
  if (logger) return logger;

  // default options
  const defaultOptions = {
    appenders: {
      stdout: {
        type: 'stdout',
      },
      datefile: {
        type: 'dateFile',
        pattern: 'yyyy-MM-dd-hh',
        filename: 'log.log',
        keepFileExt: true,
      },
    },
    categories: {
      default: {
        level: 'debug',
        appenders: ['stdout', 'datefile'],
      },
    },
  };

  // config
  const finalOptions = options || defaultOptions;
  log4js.configure(finalOptions);

  // cache
  const log = log4js.getLogger();
  setLogger(log);

  // return
  return log;
};

// set logger
function setLogger(log) {
  logger = log;
}

// logger

/**
 * qiao-log
 */
var index = (options) => {
  return getLogger(options);
};

module.exports = index;
