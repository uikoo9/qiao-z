// init
import initMethods from './init/init-methods.js';
import initStatic from './init/init-static.js';
import initController from './init/init-controller.js';
import initModules from './init/init-modules.js';
import initTask from './init/init-task.js';
import initPlugins from './init/init-plugins.js';

// listen
import listen from './listen/listen.js';

// routers
const routers = {};

/**
 * app
 */
export default (options) => {
  const app = {};

  // options
  options = options || {};

  // init methods
  initMethods(app, routers);

  // init static
  initStatic(app, routers);

  // init controller
  initController(app);

  // init modules
  initModules(app, options);

  // init task
  initTask(options);

  // init plugins
  const plugins = initPlugins(options);

  // listen
  app.listen = (port) => {
    listen(port || '5277', routers, plugins);
  };

  return app;
};
