/**
 * firstLetterUpper
 * @param {*} str
 * @returns
 */
export const firstLetterUpper = (str) => {
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
