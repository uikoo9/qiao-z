// req
import reqFn from '../server/req/req.js';

// res
import resFn from '../server/res/res.js';

// handle
import handleOptions from './handle-options.js';
import handleRouters from './handle-routers.js';
import handleStatic from './handle-static.js';
import handleAll from './handle-all.js';
import handleChecks from './handle-checks.js';
import handlePath from './handle-path.js';
import handleParams from './handle-params.js';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
const methodName = 'listenRequest';

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
  const req = await reqFn(request, plugins);
  const res = resFn(response, plugins);
  debug(methodName, 'req and res ready');

  // handle options
  debug(methodName, 'begin handleOptions');
  const optionsRes = handleOptions(req, res);
  if (optionsRes) return;

  // handle routers
  debug(methodName, 'begin handleRouters');
  const routersRes = handleRouters(routers, req, res);
  if (routersRes) return;

  // routers
  const reqMethod = req.request.method.toLowerCase();
  const reqRouters = routers[reqMethod];

  // handle static
  debug(methodName, 'begin handleStatic');
  const staticRes = handleStatic(reqRouters, req, res);
  if (staticRes) return;

  // handle all
  debug(methodName, 'begin handleAll');
  const allRes = handleAll(reqRouters, req, res);
  if (allRes) return;

  // handle checks
  debug(methodName, 'begin handleChecks');
  const checkRes = await handleChecks(plugins, req, res);
  if (checkRes) return;

  // handle path
  debug(methodName, 'begin handlePath');
  const pathRes = handlePath(reqRouters, req, res);
  if (pathRes) return;

  // handle params
  debug(methodName, 'begin handleParams');
  const paramsRes = handleParams(reqRouters, req, res);
  if (paramsRes) return;

  // other
  debug(methodName, errTip);
  res.send(errTip);
  return;
};

export default listenRequest;
