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
    if (/Controller\.js$/.test(serverFile.path) && serverFile.path.indexOf('node_modules') === -1) {
      debug(methodName, 'filename', serverFile.path);
      require(serverFile.path)(app);
      debug(methodName, 'require success');
    }
  });
};

export default initController;
