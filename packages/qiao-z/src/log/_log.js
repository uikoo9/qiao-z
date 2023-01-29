// os
import { tmpdir } from 'os';

// path
import { resolve } from 'path';

// fs
import { existsSync, mkdirSync } from 'fs';

// log4js
import log4js from 'log4js';

// logger
// eslint-disable-next-line no-unused-vars
let logger;

/**
 * get log
 * @returns
 */
export const getLogger = () => {
  // check
  if (logger) return logger;

  // log path
  const logPath = getLogPath();

  // log
  const log = getCustomLogger(logPath);
  setLogger(log);

  // return
  return log;
};

// get log path
function getLogPath() {
  // log path
  const logPath = resolve(tmpdir(), './qiao-z/logs');
  if (!existsSync(logPath)) mkdirSync(logPath, { recursive: true });

  // return
  return resolve(logPath, './x.log');
}

// get custom logger
function getCustomLogger(fileName, pattern) {
  const config = {
    appenders: {
      stdout: {
        type: 'stdout',
      },
      datefile: {
        type: 'dateFile',
        pattern: pattern || 'yyyy-MM-dd-hh',
        filename: fileName || 'log.log',
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

  log4js.configure(config);
  return log4js.getLogger();
}

// set logger
function setLogger(log) {
  logger = log;
}
