// res methods
import head from './res-head.js';
import end from './res-end.js';
import redirect from './res-redirect.js';
import send from './res-send.js';
import { json, jsonSuccess, jsonFail } from './res-json.js';
import clearCookie from './res-clear-cookie.js';
import render from './res-render.js';

// cros options
const crosOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

/**
 * res
 * @param {*} response
 * @param {*} options
 * @returns
 */
const handleRes = (response, options) => {
  const res = {};
  res.response = response;

  // cros
  if (options && options.cros) {
    res.cros = options.cros === true ? crosOptions : options.cros;
  }

  // head
  res.head = (status, opt) => {
    head(res, status, opt);
  };

  // end
  res.end = (msg) => {
    end(res, msg);
  };

  // redirect
  res.redirect = (url) => {
    redirect(res, url);
  };

  // send
  res.send = (msg) => {
    send(res, msg);
  };

  // json
  res.json = (obj) => {
    json(res, obj);
  };
  res.jsonSuccess = (msg, obj) => {
    jsonSuccess(res, msg, obj);
  };
  res.jsonFail = (msg, obj) => {
    jsonFail(res, msg, obj);
  };

  // cookie
  res.clearCookie = (name) => {
    clearCookie(res, name);
  };

  // render
  res.render = (filePath, data) => {
    render(res, filePath, data);
  };

  return res;
};

export default handleRes;
