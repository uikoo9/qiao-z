// json
import { success, danger } from 'qiao-json';

/**
 * res.json
 * @param {*} res
 * @param {*} obj
 * @returns
 */
export const json = (res, obj) => {
  // check
  if (!res || !obj) return;

  // json
  try {
    const msg = JSON.stringify(obj);
    res.head(200, { 'Content-Type': 'application/json' });
    res.end(msg);
  } catch (error) {
    console.log(error);
    res.send('res.json obj error');
  }
};

/**
 * res.jsonSuccess
 * @param {*} res
 * @param {*} msg
 * @param {*} obj
 * @returns
 */
export const jsonSuccess = (res, msg, obj) => {
  // check
  if (!res || !msg) return;

  // obj
  const jsonObj = success(msg, obj);

  // send
  json(res, jsonObj);
};

/**
 * res.jsonFail
 * @param {*} res
 * @param {*} msg
 * @param {*} obj
 * @returns
 */
export const jsonFail = (res, msg, obj) => {
  // check
  if (!res || !msg) return;

  // obj
  const jsonObj = danger(msg, obj);

  // send
  json(res, jsonObj);
};
