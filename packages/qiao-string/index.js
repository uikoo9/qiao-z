'use strict';

var qiao_log_js = require('qiao.log.js');

// Logger
const logger$2 = qiao_log_js.Logger('qiao-string');

/**
 * firstLetterLower
 * @param {*} str
 * @returns
 */
const firstLetterLower = (str) => {
  // check empty
  if (!str) {
    logger$2.info('firstLetterLower', 'need str');
    return null;
  }

  // check string
  if (typeof str != 'string') {
    logger$2.info('firstLetterLower', 'need string');
    return null;
  }

  const firstLetter = str.charAt(0).toLowerCase();
  const strLength = str.length;

  return strLength == 1 ? firstLetter : firstLetter + str.substring(1, strLength);
};

// Logger
const logger$1 = qiao_log_js.Logger('qiao-string');

/**
 * firstLetterUpper
 * @param {*} str
 * @returns
 */
const firstLetterUpper = (str) => {
  // check empty
  if (!str) {
    logger$1.info('firstLetterUpper', 'need str');
    return null;
  }

  // check string
  if (typeof str != 'string') {
    logger$1.info('firstLetterUpper', 'need string');
    return null;
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const strLength = str.length;

  return strLength == 1 ? firstLetter : firstLetter + str.substring(1, strLength);
};

// upper
const logger = qiao_log_js.Logger('qiao-string');

/**
 * underScoreCaseToCamelCase
 * @param {*} underScoreCaseName
 * @returns
 */
const underScoreCaseToCamelCase = (underScoreCaseName) => {
  if (!underScoreCaseName) {
    logger.info('underScoreCaseToCamelCase', 'need under score case name!');
    return;
  }

  const res = [];
  const strs = underScoreCaseName.split('_');
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    const strLower = str.toLowerCase();

    res.push(firstLetterUpper(strLower));
  }

  return res.join('');
};

exports.firstLetterLower = firstLetterLower;
exports.firstLetterUpper = firstLetterUpper;
exports.underScoreCaseToCamelCase = underScoreCaseToCamelCase;
