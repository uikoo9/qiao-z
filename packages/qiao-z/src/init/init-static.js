// path
import { resolve } from 'path';

// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');
const methodName = 'initStatic';

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
      const fpath = resolve(process.cwd(), rpath);

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
  logger.info(methodName, 'end');

  // acme
  app.static('/.well-known', './.well-known');
  logger.info(methodName, 'routers', routers);
};

export default initStatic;
