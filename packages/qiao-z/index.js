'use strict';

var path = require('path');
var Debug = require('debug');
var qiaoFile = require('qiao-file');
var http = require('http');
var parseurl = require('parseurl');
var cookie = require('cookie');
var ua = require('qiao-ua');
var qs = require('qs');
var getRawBody = require('raw-body');
var qiao_log_js = require('qiao.log.js');
var qiaoJson = require('qiao-json');
var template = require('art-template');

// methods
const methods = ['get', 'post'];

/**
 * init methods
 * @param {*} app
 * @param {*} routers
 * @returns
 */
const initMethods = (app, routers) => {
  //check
  if (!app || !routers) return;

  // init
  methods.forEach((v) => {
    app[v] = (path, callback) => {
      routers[v] = routers[v] || [];
      routers[v].push({
        path: path,
        callback: callback,
      });
    };
  });
};

// path
const debug$9 = Debug('qiao-z');
const methodName$7 = 'initStatic';

/**
 * init static
 */
const initStatic = (app, routers) => {
  // check
  if (!app || !routers) return;

  // static
  app.static = (router, filePath) => {
    // router and callback
    const mpath = `${router}/:opath`;
    const callback = (req, res) => {
      const opath = req.params.opath;
      const rpath = `${filePath}/${opath}`;
      const fpath = path.resolve(process.cwd(), rpath);

      res.render(fpath);
    };

    // get
    routers.get = routers.get || [];
    routers.get.push({
      path: mpath,
      callback: callback,
      static: true,
    });
  };

  // acme
  app.static('/.well-known', './.well-known');
  debug$9(methodName$7, 'routers', routers);
};

// qiao
const debug$8 = Debug('qiao-z');
const methodName$6 = 'initController';

/**
 * init controller
 * @param {*} app
 * @returns
 */
const initController = async (app) => {
  // check
  if (!app) return;

  // files
  const serverFiles = await qiaoFile.lsdir(process.cwd());
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    if (/Controller\.js$/.test(serverFile.path) && serverFile.path.indexOf('node_modules') === -1) {
      debug$8(methodName$6, 'filename', serverFile.path);
      require(serverFile.path)(app);
      debug$8(methodName$6, 'require success');
    }
  });
};

/**
 * init modules
 * @param {*} app
 * @param {*} options
 * @returns
 */
const initModules = (app, options) => {
  if (!app || !options || !options.modules) return;

  // modules
  options.modules.forEach((m) => {
    m(app);
  });
};

// file
const debug$7 = Debug('qiao-z');
const methodName$5 = 'initTask';

/**
 * init task
 * @param {*} options
 * @returns
 */
var initTask = async (options) => {
  // check
  if (!options || !options.cron) return;

  // files
  const serverFiles = await qiaoFile.lsdir(process.cwd());
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    operateTaskFile(options.cron, serverFile);
  });
};

// operate task file
function operateTaskFile(cron, serverFile) {
  const file = serverFile.path;

  if (/Task\.js$/.test(file)) {
    debug$7(methodName$5, 'operateTaskFile', file);

    const task = require(file);
    debug$7(methodName$5, 'operateTaskFile', 'require success');
    if (!task || !task.time || !task.tick) return;

    if (task.runAndInit) {
      debug$7(methodName$5, 'operateTaskFile', 'runAndInit');
      cron.runAndInit(task.time, task.tick);
    } else {
      debug$7(methodName$5, 'operateTaskFile', 'run');
      cron.run(task.time, task.tick);
    }
  }
}

// logger
const debug$6 = Debug('qiao-z');
const methodName$4 = 'initPlugins';

// cros options
const crosOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

/**
 * init plugins
 * @param {*} options
 * @returns
 */
var initPlugins = (options) => {
  // plugins
  const plugins = {};

  // checks
  if (options && options.checks) {
    debug$6(methodName$4, 'options.checks');
    plugins.checks = options.checks;
  }

  // cros
  if (options && options.cros) {
    debug$6(methodName$4, 'options.cros');
    plugins.cros = options.cros === true ? crosOptions : options.cros;
  }

  // logger
  if (options && options.log && options.logOptions) {
    debug$6(methodName$4, 'options.log');
    plugins.logger = options.log(options.logOptions);
  }

  // mysql
  if (options && options.mysql && options.config && options.config.db) {
    debug$6(methodName$4, 'options.db');
    plugins.db = options.mysql(options.config.db);
  }

  // upload
  if (options && options.upload) {
    debug$6(methodName$4, 'options.upload');
    plugins.upload = options.upload;
  }

  return plugins;
};

// file
const debug$5 = Debug('qiao-z');
const methodName$3 = 'clearHtml';

/**
 * clear html
 */
var clearHtml = async () => {
  // files
  const serverFiles = await qiaoFile.lsdir(process.cwd());
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach(async (serverFile) => {
    const file = serverFile.path;

    if (/\.html\.html$/.test(file)) {
      debug$5(methodName$3, 'file', file);
      await qiaoFile.rm(file);
      debug$5(methodName$3, 'rm success');
    }
  });
};

/**
 * handle headers
 * @param {*} request
 * @returns
 */
const handleHeaders = (request) => {
  const headers = {};

  // check
  const rawHeaders = request.rawHeaders;
  if (!rawHeaders || !rawHeaders.length) return headers;

  // handle
  rawHeaders.forEach((h, i) => {
    if (i % 2 == 0) headers[h.toLowerCase()] = rawHeaders[i + 1];
  });
  return headers;
};

// cookie

// default cookie
const defaultCookies = {};

/**
 * handle cookies
 * @param {*} req
 * @returns
 */
const handleCookies = (req) => {
  // check
  if (!req || !req.headers || !req.headers['cookie']) return defaultCookies;

  // return
  return cookie.parse(req.headers['cookie']);
};

// ua

/**
 * handle useragent
 * @param {*} req
 * @returns
 */
const handleUseragent = (req) => {
  return !req || !req.headers || !req.headers['user-agent'] ? {} : ua(req.headers['user-agent']);
};

// qs

/**
 * handle query
 * @param {*} req
 * @returns
 */
const handleQuery = (req) => {
  return !req || !req.url || !req.url.query ? {} : qs.parse(req.url.query);
};

// raw body
const logger$2 = qiao_log_js.Logger('qiao-z');

// default body
const defaultBody = {};

/**
 * handle body
 * @param {*} req
 * @param {*} plugins
 * @returns
 */
const handleBody = async (req, plugins) => {
  // check
  if (!req || !req.headers || !req.headers['content-type']) return defaultBody;

  // body
  let body;
  try {
    // content type
    const contentType = req.headers['content-type'];

    // upload
    if (contentType.indexOf('multipart/form-data') > -1) {
      if (!plugins || !plugins.upload) return defaultBody;

      return await plugins.upload.uploadSync(req.request);
    } else {
      // body string
      const bodyString = await getBodyString(req);
      if (!bodyString) return defaultBody;

      // xfrom
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        body = qs.parse(bodyString);
      }

      // json
      if (contentType.indexOf('application/json') > -1) {
        body = JSON.parse(bodyString);
      }
    }
  } catch (error) {
    logger$2.info('handleBody', error);
  }

  // return
  return body || defaultBody;
};

// get body string
async function getBodyString(req) {
  try {
    // options
    const options = {
      length: req.headers['content-length'],
      limit: '10mb',
      encoding: true,
    };

    // body str
    return await getRawBody(req.request, options);
  } catch (e) {
    logger$2.info('getBodyString', e);
    return null;
  }
}

// parseurl

/**
 * req
 * @param {*} request
 * @param {*} plugins
 * @returns
 */
const handleRequest = async (request, plugins) => {
  const req = {};
  req.request = request;
  req.url = parseurl(request);
  req.headers = handleHeaders(request);
  req.cookies = handleCookies(req);
  req.useragent = handleUseragent(req);
  req.query = handleQuery(req);
  req.body = await handleBody(req, plugins);

  // ip
  const ip = req.headers['x-real-ip'];
  if (ip) req.ip = ip;

  // logger
  if (plugins && plugins.logger) {
    req.logger = plugins.logger;
  }

  // mysql
  if (plugins && plugins.db) {
    req.db = plugins.db;
  }

  return req;
};

/**
 * res.head
 * @param {*} res
 * @param {*} status
 * @param {*} options
 * @returns
 */
const head = (res, status, options) => {
  // check
  if (!res) return;

  // heads
  res.heads = {
    status: status,
    options: options,
  };
};

/**
 * res.end
 * @param {*} res
 * @param {*} msg
 */
const end = (res, msg) => {
  // check
  if (!res) return;

  // clear cookies
  if (res.clearCookies && res.clearCookies.length) {
    res.response.setHeader('Set-Cookie', res.clearCookies);
    delete res.clearCookies;
  }

  // heads
  if (res.heads) {
    const status = res.heads.status;
    const options = res.heads.options;
    const opt = res.cros && status == 200 ? Object.assign({}, res.cros, options) : options;

    // head
    res.response.writeHead(status, opt);
  } else {
    // only cros
    if (res.cros) res.response.writeHead(200, res.cros);
  }

  // delete
  delete res.cros;
  delete res.heads;
  delete res.head;
  delete res.end;

  // end
  res.response.end(msg);
};

/**
 * res.redirect
 * @param {*} res
 * @param {*} url
 * @returns
 */
const redirect = (res, url) => {
  // check
  if (!res || !url) return;

  // redirect
  res.head(302, { Location: url });
  res.end();
};

/**
 * res.send
 * @param {*} res
 * @param {*} msg
 * @returns
 */
const send = (res, msg) => {
  if (!res || !msg) return;

  res.head(200, { 'Content-Type': 'text/plain' });
  res.end(msg);
};

// json
const logger$1 = qiao_log_js.Logger('qiao-z');

/**
 * res.json
 * @param {*} res
 * @param {*} obj
 * @returns
 */
const json = (res, obj) => {
  // check
  if (!res || !obj) return;

  // json
  try {
    const msg = JSON.stringify(obj);
    res.head(200, { 'Content-Type': 'application/json' });
    res.end(msg);
  } catch (error) {
    logger$1.info('json', error);
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
const jsonSuccess = (res, msg, obj) => {
  // check
  if (!res || !msg) return;

  // obj
  const jsonObj = qiaoJson.success(msg, obj);

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
const jsonFail = (res, msg, obj) => {
  // check
  if (!res || !msg) return;

  // obj
  const jsonObj = qiaoJson.fail(msg, obj);

  // send
  json(res, jsonObj);
};

// cookie

/**
 * setCookie
 * @param {*} res
 * @param {*} key
 * @param {*} value
 * @param {*} maxAge
 * @param {*} path
 * @returns
 */
const setCookie = (res, key, value, maxAge, path) => {
  // check
  if (!res || !key || !value) return;

  res.response.setHeader(
    'Set-Cookie',
    cookie.serialize(key, String(value), {
      secure: true,
      sameSite: 'none',
      maxAge: maxAge || 60 * 60 * 24 * 7, // 1 week
      path: path || '/',
    }),
  );
};

/**
 * res.clearCookie
 * @param {*} res
 * @param {*} name
 */
const clearCookie = (res, name) => {
  // check
  if (!res || !name) return;

  // clear cookies
  const str = cookie.serialize(name, '', {
    secure: true,
    sameSite: 'none',
    expires: new Date(1),
    path: '/',
  });
  res.clearCookies = res.clearCookies || [];
  res.clearCookies.push(str);
};

// path
const debug$4 = Debug('qiao-z');

/**
 * res.render
 * @param {*} res
 * @param {*} filePath
 * @param {*} data
 * @param {*} cacheFilePath
 * @returns
 */
const render = async (res, filePath, data, cacheFilePath) => {
  // check
  if (!res) return;
  if (!filePath) {
    res.send('render: please check file path!');
    return;
  }

  // final path
  const finalPath = path.resolve(process.cwd(), filePath);
  if (!(await qiaoFile.isExists(finalPath))) {
    res.send('render: file path is not exists');
    return;
  }

  // file
  let file;
  let contentType;
  if (qiaoFile.extname(finalPath) == '.html') {
    if (data) {
      file = template(finalPath, data);
      contentType = 'text/html';
    } else {
      file = await qiaoFile.readFile(finalPath);
      contentType = 'text/html';
    }
  } else {
    file = await qiaoFile.readFile(finalPath);
    contentType = 'text/plain';
  }
  if (file === undefined) {
    res.send('render: read file error');
    return;
  }

  // static
  if (cacheFilePath) {
    const staticPath = typeof cacheFilePath === 'boolean' ? `${finalPath}.html` : `${cacheFilePath}.html`;
    await qiaoFile.writeFile(staticPath, file);
  }

  // res
  debug$4(`render from ${finalPath}`);
  res.response.writeHeader(200, { 'Content-Type': contentType });
  res.response.write(file);
  res.response.end();
};

// path
const debug$3 = Debug('qiao-z');

/**
 * res.staticRender
 * @param {*} res
 * @param {*} filePath
 * @param {*} data
 * @returns
 */
const staticRender = async (res, filePath) => {
  // check
  if (!res) return;
  if (!filePath) return;
  if (qiaoFile.extname(filePath) !== '.html') return;

  // static path
  let finalPath = path.resolve(process.cwd(), filePath);
  const staticPath = `${finalPath}.html`;
  if (!(await qiaoFile.isExists(staticPath))) return;

  debug$3(`staticRender from ${staticPath}`);
  const file = await qiaoFile.readFile(staticPath);
  res.response.writeHeader(200, { 'Content-Type': 'text/html' });
  res.response.write(file);
  res.response.end();
  return true;
};

// http
const logger = qiao_log_js.Logger('qiao-z');

/**
 * res.proxy
 * @param {*} request
 * @param {*} response
 * @param {*} proxyOptions
 * @param {*} proxyCallback
 * @returns
 */
const proxy = (request, response, proxyOptions, proxyCallback) => {
  const methodName = 'res.proxy';

  // check
  if (!proxyOptions) {
    logger.error(methodName, 'need proxyOptions');
    responseError(response, proxyCallback);
    return;
  }
  if (!proxyOptions.host) {
    logger.error(methodName, 'need proxyOptions.host');
    responseError(response, proxyCallback);
    return;
  }
  if (!proxyOptions.port) {
    logger.error(methodName, 'need proxyOptions.port');
    responseError(response, proxyCallback);
    return;
  }
  if (!proxyOptions.path) {
    logger.error(methodName, 'need proxyOptions.path');
    responseError(response, proxyCallback);
    return;
  }

  // options
  const options = {
    hostname: proxyOptions.host,
    port: proxyOptions.port,
    path: proxyOptions.path,
    method: request.method,
    headers: request.headers,
  };
  logger.info(methodName, 'options', options);

  // proxy
  const proxyRequest = http.request(options, (proxyRes) => {
    logger.info(methodName, 'proxyRes.statusCode', proxyRes.statusCode);
    logger.info(methodName, 'proxyRes.headers', proxyRes.headers);
    if (proxyCallback) proxyCallback(null, proxyRes);

    // cookies
    responseSetCookie(response, proxyOptions);
    responseClearCookie(response, proxyOptions);

    // res
    response.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(response, { end: true });
  });
  proxyRequest.on('error', (err) => {
    logger.error(methodName, 'proxy request error', err);
    responseError(response, proxyCallback);
  });

  // proxy req
  if (request.method === 'POST') {
    const postData = JSON.stringify(proxyOptions.body);
    logger.info(methodName, 'postData', postData);
    proxyRequest.write(postData);
    proxyRequest.end();
  } else {
    request.pipe(proxyRequest, { end: true });
  }
};

// response error
function responseError(response, proxyCallback) {
  const error = 'proxy server error';
  if (proxyCallback) proxyCallback(error);

  response.writeHead(500, { 'Content-Type': 'application/json' });
  response.end({ error });
}

// response set cookie
function responseSetCookie(response, proxyOptions) {
  // check
  if (!proxyOptions || !proxyOptions.cookies) return;

  // set
  let setCookieHeaders = [];
  for (let i = 0; i < proxyOptions.cookies.length; i++) {
    const item = proxyOptions.cookies[i];
    setCookieHeaders.push(
      cookie.serialize(item.key, String(item.value), {
        secure: true,
        sameSite: 'none',
        maxAge: item.maxAge || 60 * 60 * 24 * 7, // 1 week
        path: item.path || '/',
      }),
    );
  }
  response.setHeader('Set-Cookie', setCookieHeaders);
}

// response clear cookie
function responseClearCookie(response, proxyOptions) {
  // check
  if (!proxyOptions || !proxyOptions.clearCookies) return;

  // clear
  let setCookieHeaders = [];
  for (let i = 0; i < proxyOptions.clearCookies.length; i++) {
    const item = proxyOptions.clearCookies[i];
    setCookieHeaders.push(
      cookie.serialize(item.key, '', { secure: true, sameSite: 'none', expires: new Date(1), path: '/' }),
    );
  }
  response.setHeader('Set-Cookie', setCookieHeaders);
}

// res methods

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

/**
 * handle options
 * @param {*} req
 * @param {*} res
 */
const handleOptions = (req, res) => {
  // check
  const reqMethod = req.request.method.toLowerCase();
  if (reqMethod != 'options') return;

  // return
  res.end('');
  return true;
};

/**
 * handle routers
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleRouters = (routers, req, res) => {
  // check
  const reqMethod = req.request.method.toLowerCase();
  const reqRouters = routers[reqMethod];
  if (reqRouters && reqRouters.length) return;

  // return
  res.send('no routers');
  return true;
};

/**
 * handle params router
 * @param {*} router
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleParamsRouter = (router, req, res) => {
  // check :
  if (router.path.indexOf(':') == -1) return;

  // check start
  const f = router.path.split(':')[0];
  if (req.url.pathname.indexOf(f) !== 0) return;

  // params
  const param = router.path.substring(f.length + 1);
  req.params = {};
  req.params[param] = req.url.pathname.substring(f.length);

  // callback
  router.callback(req, res);
  return true;
};

// handle params router

/**
 * handle static
 * @param {*} routers
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleStatic = (routers, req, res) => {
  // check
  if (!routers || !routers.length || !req || !res) return;

  // check
  let check;
  for (let i = 0; i < routers.length; i++) {
    const router = routers[i];

    // check static
    if (!router.static) continue;

    // params
    const paramsRouterRes = handleParamsRouter(router, req, res);
    if (!paramsRouterRes) continue;

    // return
    check = true;
    break;
  }

  // return
  return check;
};

/**
 * handle all
 * @param {*} routers
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleAll = (routers, req, res) => {
  // check
  if (!routers || !routers.length || !req || !res) return;

  // check
  let check;
  for (let i = 0; i < routers.length; i++) {
    const router = routers[i];
    if (router.path != '/*') continue;

    router.callback(req, res);
    check = true;
    break;
  }

  // return
  return check;
};

/**
 * handle checks
 * @param {*} plugins
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleChecks = async (plugins, req, res) => {
  // check
  if (!plugins || !plugins.checks || !plugins.checks.length) return;

  // check
  let r;
  for (let i = 0; i < plugins.checks.length; i++) {
    const check = plugins.checks[i];
    const checkRes = await check(req, res);
    if (checkRes) continue;

    r = true;
    break;
  }

  // return
  return r;
};

/**
 * handle path
 * @param {*} routers
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handlePath = (routers, req, res) => {
  // check
  if (!routers || !routers.length || !req || !res) return;

  let check;
  for (let i = 0; i < routers.length; i++) {
    const router = routers[i];
    if (router.path != req.url.pathname) continue;

    router.callback(req, res);
    check = true;
    break;
  }

  return check;
};

// handle params router

/**
 * handle params
 * @param {*} routers
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleParams = (routers, req, res) => {
  // check
  if (!routers || !routers.length || !req || !res) return;

  let check;
  for (let i = 0; i < routers.length; i++) {
    const router = routers[i];

    // params
    const paramsRouterRes = handleParamsRouter(router, req, res);
    if (!paramsRouterRes) continue;

    // return
    check = true;
    break;
  }

  return check;
};

// req
const debug$2 = Debug('qiao-z');
const methodName$2 = 'listenRequest';

// err tip
const errTip = 'can not get router';

/**
 * listen request
 * @param {*} request
 * @param {*} response
 * @param {*} routers
 * @param {*} plugins
 * @returns
 */
const listenRequest = async (request, response, routers, plugins) => {
  // req res
  const req = await handleRequest(request, plugins);
  const res = handleRes(request, response, plugins);
  debug$2(methodName$2, 'req and res ready');

  // handle options
  debug$2(methodName$2, 'begin handleOptions');
  const optionsRes = handleOptions(req, res);
  if (optionsRes) return;

  // handle routers
  debug$2(methodName$2, 'begin handleRouters');
  const routersRes = handleRouters(routers, req, res);
  if (routersRes) return;

  // routers
  const reqMethod = req.request.method.toLowerCase();
  const reqRouters = routers[reqMethod];

  // handle static
  debug$2(methodName$2, 'begin handleStatic');
  const staticRes = handleStatic(reqRouters, req, res);
  if (staticRes) return;

  // handle all
  debug$2(methodName$2, 'begin handleAll');
  const allRes = handleAll(reqRouters, req, res);
  if (allRes) return;

  // handle checks
  debug$2(methodName$2, 'begin handleChecks');
  const checkRes = await handleChecks(plugins, req, res);
  if (checkRes) return;

  // handle path
  debug$2(methodName$2, 'begin handlePath');
  const pathRes = handlePath(reqRouters, req, res);
  if (pathRes) return;

  // handle params
  debug$2(methodName$2, 'begin handleParams');
  const paramsRes = handleParams(reqRouters, req, res);
  if (paramsRes) return;

  // other
  debug$2(methodName$2, errTip);
  res.send(errTip);
  return;
};

// http
const debug$1 = Debug('qiao-z');
const methodName$1 = 'listen';

/**
 * listen
 * @param {*} port
 * @param {*} routers
 * @param {*} plugins
 * @returns
 */
const listen = (port, routers, plugins) => {
  if (!routers) return;

  // server
  const server = http.createServer();

  // on
  server.on('checkContinue', () => {
    debug$1(methodName$1, 'checkContinue');
  });
  server.on('checkExpectation', () => {
    debug$1(methodName$1, 'checkExpectation');
  });
  server.on('clientError', (err) => {
    debug$1(methodName$1, 'clientError', err);
  });
  server.on('close', () => {
    debug$1(methodName$1, 'close');
  });
  server.on('connect', () => {
    debug$1(methodName$1, 'connect');
  });
  server.on('dropRequest', () => {
    debug$1(methodName$1, 'dropRequest');
  });
  server.on('upgrade', () => {
    debug$1(methodName$1, 'upgrade');
  });

  // request
  server.on('request', (request, response) => {
    debug$1(methodName$1, 'request');
    listenRequest(request, response, routers, plugins);
  });

  // listen
  server.listen(port);
  debug$1(methodName$1, 'listen end');
};

// init
const debug = Debug('qiao-z');
const methodName = 'constructor';

// routers
const routers = {};

/**
 * app
 */
var app = async (options) => {
  // options
  options = options || {};
  if (options.config) global.QZ_CONFIG = options.config;

  // app
  const app = {};

  // init methods
  debug(methodName, 'start init methos');
  initMethods(app, routers);
  debug(methodName, 'end init methos');

  // init static
  debug(methodName, 'start init static');
  initStatic(app, routers);
  debug(methodName, 'end init static');

  // init controller
  debug(methodName, 'start init controller');
  await initController(app);
  debug(methodName, 'end init controller');

  // init modules
  debug(methodName, 'start init modules');
  initModules(app, options);
  debug(methodName, 'end init modules');

  // init task
  debug(methodName, 'start init task');
  await initTask(options);
  debug(methodName, 'end init task');

  // init plugins
  debug(methodName, 'start init plugins');
  const plugins = initPlugins(options);
  debug(methodName, 'end init plugins');

  // clear html
  debug(methodName, 'start clear html');
  await clearHtml();
  debug(methodName, 'end clear html');

  // listen
  app.listen = (port) => {
    debug(methodName, 'listen port', port);
    debug(methodName, 'listen routers', routers);
    listen(port || '5277', routers, plugins);
    debug(methodName, 'qiao-z start success');
  };

  //
  return app;
};

module.exports = app;
