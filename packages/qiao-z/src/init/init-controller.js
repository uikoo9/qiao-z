// qiao
import { lsdir } from 'qiao-file';

// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');
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
    if (/Controller\.js$/.test(serverFile.path)) {
      logger.info(methodName, 'filename', serverFile.path);
      require(serverFile.path)(app);
      logger.info(methodName, 'require success');
    }
  });
};

export default initController;
