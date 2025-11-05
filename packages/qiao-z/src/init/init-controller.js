// qiao
import { lsdir } from 'qiao-file';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
const methodName = 'initController';

/**
 * init controller
 * @param {*} app
 * @returns
 */
const initController = async (app) => {
  // check
  if (!app) return;

  // files
  const serverFiles = await lsdir(process.cwd());
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    let needCheckController = false;
    const serverFilePath = serverFile.path;
    const isShunJs = serverFilePath.indexOf('/@shun-js/') > -1;
    const nodeModulesIndex = serverFilePath.match(/node_modules/g);
    const nodeModulesLength = nodeModulesIndex ? nodeModulesIndex.length : 0;
    if (nodeModulesLength === 0) needCheckController = true;
    if (nodeModulesLength === 1 && isShunJs) needCheckController = true;
    if (!needCheckController) return;

    // check controller
    if (/Controller\.js$/.test(serverFilePath)) {
      debug(methodName, 'filename', serverFilePath);
      require(serverFilePath)(app);
      debug(methodName, 'require success');
    }
  });
};

export default initController;
