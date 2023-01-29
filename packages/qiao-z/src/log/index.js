// log
import { getLog } from './_log.js';

// log type
const logTypes = ['debug', 'info', 'warn', 'error'];

/**
 * init
 * @param {*} tag
 * @returns
 */
export default (tag) => {
  // tag
  tag = tag || 'qiao-z';

  // obj
  const obj = {};
  logTypes.forEach((logType) => {
    obj[logType] = (...msg) => {
      log(logType, tag, ...msg);
    };
  });

  return obj;
};

// log
function log(type, tag, ...msg) {
  const logger = getLog();
  if (logger) {
    logger[type](tag, ...msg);
  } else {
    console.log(tag, ...msg);
  }
}
