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
  logger.info(methodName, 'start init methos');
  initMethods(app, routers);
  logger.info(methodName, 'end init methos');

  // init static
  logger.info(methodName, 'start init static');
  initStatic(app, routers);
  logger.info(methodName, 'end init static');

  // init controller
  logger.info(methodName, 'start init controller');
  await initController(app);
  logger.info(methodName, 'end init controller');

  // init modules
  logger.info(methodName, 'start init modules');
  initModules(app, options);
  logger.info(methodName, 'end init modules');

  // init task
  logger.info(methodName, 'start init task');
  await initTask(options);
  logger.info(methodName, 'end init task');

  // init plugins
  logger.info(methodName, 'start init plugins');
  const plugins = initPlugins(options);
  logger.info(methodName, 'end init plugins');

  // clear html
  logger.info(methodName, 'start clear html');
  await clearHtml();
  logger.info(methodName, 'end clear html');

  // listen
  app.listen = (port) => {
    logger.info(methodName, 'listen port', port);
    logger.info(methodName, 'listen routers', routers);
    listen(port || '5277', routers, plugins);
    logger.info(methodName, 'qiao-z start success');
  };

  //
  return app;
};
