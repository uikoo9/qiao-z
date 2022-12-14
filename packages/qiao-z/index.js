'use strict';

var path = require('path');
var qiaoFile = require('qiao-file');
var http = require('http');
var parseurl = require('parseurl');
var cookie = require('cookie');
var ua = require('qiao-ua');
var qs = require('qs');
var getRawBody = require('raw-body');
var template = require('art-template');

// cros options
const crosOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

/**
 * init app
 * @param {*} app
 * @param {*} options
 * @returns
 */
const initApp = (app, options) => {
  if (!app || !options) return;

  // cros
  if (options.cros) {
    app._cros = options.cros === true ? crosOptions : options.cros || {};
  }

  // checks
  if (options.checks) {
    app._checks = options.checks;
  }

  // modules
  if (options.modules && options.config) {
    options.modules.forEach((m) => {
      m(app, options.config);
    });
  }

  // upload
  if (options.upload) {
    app._upload = options.upload;
  }

  // mysql
  if (options.mysql && options.config && options.config.db) {
    app._db = options.mysql(options.config.db);
  }
};

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
};

// qiao

/**
 * init controller
 * @param {*} app
 * @returns
 */
const initController = (app) => {
  // check
  if (!app) return;

  // files
  const serverFiles = qiaoFile.lsdir(process.cwd() + '/');
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    const file = serverFile.path + serverFile.name;

    if (/Controller\.js$/.test(file)) require(file)(app);
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

// default body
const defaultBody = {};

/**
 * handle body
 * @param {*} req
 * @param {*} upload
 * @returns
 */
const handleBody = async (req, upload) => {
  // check
  if (!req || !req.headers || !req.headers['content-type']) return defaultBody;

  // body
  let body;
  try {
    // content type
    const contentType = req.headers['content-type'];

    // upload
    if (contentType.indexOf('multipart/form-data') > -1) {
      if (!upload) return defaultBody;

      return await upload.uploadSync(req.request);
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
    console.log(error);
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
      limit: '1mb',
      encoding: true,
    };

    // body str
    return await getRawBody(req.request, options);
  } catch (e) {
    console.log(e);
    return null;
  }
}

// parseurl

/**
 * req
 * @param {*} request
 * @param {*} app
 * @returns
 */
const handleRequest = async (request, app) => {
  const req = {};
  req.request = request;
  req.url = parseurl(request);
  req.headers = handleHeaders(request);
  req.cookies = handleCookies(req);
  req.useragent = handleUseragent(req);
  req.query = handleQuery(req);
  req.body = await handleBody(req, app._upload);
  req.db = app._db;

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
const jsonSuccess = (res, msg, obj) => {
  // check
  if (!res || !msg) return;

  // json
  const jsonObj = {
    type: true,
    msg: msg,
  };

  // obj
  if (obj) jsonObj.obj = obj;

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

  // json
  const jsonObj = {
    type: false,
    msg: msg,
  };

  // obj
  if (obj) jsonObj.obj = obj;

  // send
  json(res, jsonObj);
};

// cookie

/**
 * res.clearCookie
 * @param {*} res
 * @param {*} name
 */
const clearCookie = (res, name) => {
  // check
  if (!res || !name) return;

  // clear cookies
  const str = cookie.serialize(name, '', { expires: new Date(1), path: '/' });
  res.clearCookies = res.clearCookies || [];
  res.clearCookies.push(str);
};

// path

/**
 * res.render
 * @param {*} res
 * @param {*} filePath
 * @param {*} data
 * @returns
 */
const render = (res, filePath, data) => {
  // check res
  if (!res) return;

  // check
  if (!filePath) {
    res.send('render: please check file path!');
    return;
  }

  // final path
  const finalPath = path.resolve(process.cwd(), filePath);
  if (!qiaoFile.isExists(filePath)) {
    res.send('render: file path is not exists');
    return;
  }

  // file
  let file;
  let contentType;
  if (qiaoFile.extname(finalPath) == '.html') {
    file = template(finalPath, data || {});
    contentType = 'text/html';
  } else {
    file = qiaoFile.readFile(finalPath);
    contentType = 'text/plain';
  }
  if (!file) {
    res.send('render: read file error');
    return;
  }

  res.response.writeHeader(200, { 'Content-Type': contentType });
  res.response.write(file);
  res.end();
};

// res methods

/**
 * res
 * @param {*} response
 * @param {*} cros
 * @returns
 */
const handleRes = (response, cros) => {
  const res = {};
  res.response = response;
  res.cros = cros;
  res.head = (status, options) => {
    head(res, status, options);
  };
  res.end = (msg) => {
    end(res, msg);
  };
  res.redirect = (url) => {
    redirect(res, url);
  };
  res.send = (msg) => {
    send(res, msg);
  };
  res.json = (obj) => {
    json(res, obj);
  };
  res.jsonSuccess = (msg, obj) => {
    jsonSuccess(res, msg, obj);
  };
  res.jsonFail = (msg, obj) => {
    jsonFail(res, msg, obj);
  };
  res.clearCookie = (name) => {
    clearCookie(res, name);
  };
  res.render = (filePath, data) => {
    render(res, filePath, data);
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
 * @param {*} routers
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleChecks = async (app, req, res) => {
  // check
  if (!app || !app._checks || !app._checks.length) return;

  // check
  let r;
  for (let i = 0; i < app._checks.length; i++) {
    const check = app._checks[i];
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

/**
 * listen request
 * @param {*} request
 * @param {*} response
 * @param {*} routers
 * @param {*} app
 * @returns
 */
const listenRequest = async (request, response, routers, app) => {
  // req res
  const req = await handleRequest(request, app);
  const res = handleRes(response, app._cros);

  // handle options
  const optionsRes = handleOptions(req, res);
  if (optionsRes) return;

  // handle routers
  const routersRes = handleRouters(routers, req, res);
  if (routersRes) return;

  // routers
  const reqMethod = req.request.method.toLowerCase();
  const reqRouters = routers[reqMethod];

  // handle static
  const staticRes = handleStatic(reqRouters, req, res);
  if (staticRes) return;

  // handle all
  const allRes = handleAll(reqRouters, req, res);
  if (allRes) return;

  // handle checks
  const checkRes = await handleChecks(app, req, res);
  if (checkRes) return;

  // handle path
  const pathRes = handlePath(reqRouters, req, res);
  if (pathRes) return;

  // handle params
  const paramsRes = handleParams(reqRouters, req, res);
  if (paramsRes) return;

  // other
  res.send('can not get router');
  return;
};

// http

/**
 * listen
 * @param {*} port
 * @param {*} routers
 * @param {*} app
 * @returns
 */
const listen = (port, routers, app) => {
  if (!routers) return;

  // server
  const server = http.createServer();

  // on
  server.on('checkContinue', () => {
    console.log('checkContinue');
  });
  server.on('checkExpectation', () => {
    console.log('checkExpectation');
  });
  server.on('clientError', (err) => {
    console.log('clientError', err);
  });
  server.on('close', () => {
    console.log('close');
  });
  server.on('connect', () => {
    console.log('connect');
  });
  server.on('dropRequest', () => {
    console.log('dropRequest');
  });
  server.on('upgrade', () => {
    console.log('upgrade');
  });

  // request
  server.on('request', (request, response) => {
    listenRequest(request, response, routers, app);
  });

  // listen
  server.listen(port);
};

// init

// routers
const routers = {};

/**
 * app
 */
var app = (options) => {
  const app = {};

  // init methods
  initMethods(app, routers);

  // init static
  initStatic(app, routers);

  // init controller
  initController(app);

  // init app
  initApp(app, options);

  // listen
  app.listen = (port) => {
    listen(port || '5277', routers, app);
  };

  return app;
};

module.exports = app;
