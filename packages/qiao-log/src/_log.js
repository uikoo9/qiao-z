// log4js
import log4js from 'log4js';

// logger
let logger;

/**
 * get logger
 * @param {*} options
 * @returns
 */
export const getLogger = (options) => {
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
