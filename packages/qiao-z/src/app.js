// init
import initMethods from './init/init-methods.js';
import initStatic from './init/init-static.js';
import initController from './init/init-controller.js';
import initModules from './init/init-modules.js';
import initTask from './init/init-task.js';
import initPlugins from './init/init-plugins.js';
import clearHtml from './init/clear-html.js';

// listen
import listen from './listen/listen.js';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
const methodName = 'constructor';

// routers
const routers = {};

/**
 * app
 */
export default async (options) => {
  // app
  const app = {};

  // options
  options = options || {};

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
