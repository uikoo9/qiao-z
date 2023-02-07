// upper
import { firstLetterUpper } from './first-letter-upper.js';

/**
 * underScoreCaseToCamelCase
 * @param {*} underScoreCaseName
 * @returns
 */
export const underScoreCaseToCamelCase = (underScoreCaseName) => {
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
