// res methods
import head from './res-head.js';
import end from './res-end.js';
import redirect from './res-redirect.js';
import send from './res-send.js';
import html from './res-html.js';
import { json, jsonSuccess, jsonFail } from './res-json.js';
import { clearCookie, setCookie } from './res-cookie.js';
import render from './res-render.js';
import staticRender from './res-static-render.js';
import proxy from './res-proxy.js';

/**
 * res
 * @param {*} request
 * @param {*} response
 * @param {*} plugins
 * @returns
 */
const handleRes = (request, response, plugins) => {
  const res = {};
  res.response = response;

  // cros
  if (plugins && plugins.cros) {
    res.cros = plugins.cros;
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

  // html
  res.html = (htmlData, encoding) => {
    html(res, htmlData, encoding);
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
  res.setCookie = (name, value) => {
    setCookie(res, name, value);
  };

  // render
  res.render = (filePath, data, toStatic) => {
    render(res, filePath, data, toStatic);
  };
  res.staticRender = async (filePath) => {
    return await staticRender(res, filePath);
  };

  // proxy
  res.proxy = (proxyOptions, proxyCallback) => {
    proxy(request, response, proxyOptions, proxyCallback);
  };

  return res;
};

export default handleRes;
