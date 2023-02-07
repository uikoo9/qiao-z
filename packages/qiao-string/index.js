'use strict';

/**
 * firstLetterLower
 * @param {*} str
 * @returns
 */
const firstLetterLower = (str) => {
  // check empty
  if (!str) {
    console.log('need str');
    return null;
  }

  // check string
  if (typeof str != 'string') {
    console.log('need string');
    return null;
  }

  const firstLetter = str.charAt(0).toLowerCase();
  const strLength = str.length;

  return strLength == 1 ? firstLetter : firstLetter + str.substring(1, strLength);
};

/**
 * firstLetterUpper
 * @param {*} str
 * @returns
 */
const firstLetterUpper = (str) => {
  // check empty
  if (!str) {
    console.log('need str');
    return null;
  }

  // check string
  if (typeof str != 'string') {
    console.log('need string');
    return null;
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const strLength = str.length;

  return strLength == 1 ? firstLetter : firstLetter + str.substring(1, strLength);
};

// upper

/**
 * underScoreCaseToCamelCase
 * @param {*} underScoreCaseName
 * @returns
 */
const underScoreCaseToCamelCase = (underScoreCaseName) => {
  if (!underScoreCaseName) {
    console.log('need under score case name!');
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
