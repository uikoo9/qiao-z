// path
import { resolve } from 'path';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
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

  // acme
  app.static('/.well-known', './.well-known');
  debug(methodName, 'routers', routers);
};

export default initStatic;
