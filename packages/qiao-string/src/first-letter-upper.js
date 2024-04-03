// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-string');

/**
 * firstLetterUpper
 * @param {*} str
 * @returns
 */
export const firstLetterUpper = (str) => {
  // check empty
  if (!str) {
    logger.info('firstLetterUpper', 'need str');
    return null;
  }

  // check string
  if (typeof str != 'string') {
    logger.info('firstLetterUpper', 'need string');
    return null;
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const strLength = str.length;

  return strLength == 1 ? firstLetter : firstLetter + str.substring(1, strLength);
};
