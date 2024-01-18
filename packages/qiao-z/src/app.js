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
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');
const methodName = 'qiao-z()';

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
  logger.info(methodName, 'begin init methos');
  initMethods(app, routers);

  // init static
  logger.info(methodName, 'begin init static');
  initStatic(app, routers);

  // init controller
  logger.info(methodName, 'begin init controller');
  await initController(app);

  // init modules
  logger.info(methodName, 'begin init modules');
  initModules(app, options);

  // init task
  logger.info(methodName, 'begin init task');
  await initTask(options);

  // init plugins
  logger.info(methodName, 'begin init plugins');
  const plugins = initPlugins(options);

  // clear html
  logger.info(methodName, 'begin clear html');
  await clearHtml();

  // listen
  app.listen = (port) => {
    logger.info(methodName, 'listen port', port);
    logger.info(methodName, 'listen routers', routers);
    listen(port || '5277', routers, plugins);
  };

  //
  return app;
};
