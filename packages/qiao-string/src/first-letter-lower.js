// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-string');

/**
 * firstLetterLower
 * @param {*} str
 * @returns
 */
export const firstLetterLower = (str) => {
  // check empty
  if (!str) {
    logger.info('firstLetterLower', 'need str');
    return null;
  }

  // check string
  if (typeof str != 'string') {
    logger.info('firstLetterLower', 'need string');
    return null;
  }

  const firstLetter = str.charAt(0).toLowerCase();
  const strLength = str.length;

  return strLength == 1 ? firstLetter : firstLetter + str.substring(1, strLength);
};
