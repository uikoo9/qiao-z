// qiao
import { lsdir } from 'qiao-file';

/**
 * init controller
 * @param {*} app
 * @returns
 */
const initController = (app) => {
  // check
  if (!app) return;

  // files
  const serverFiles = lsdir(process.cwd() + '/');
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    const file = serverFile.path + serverFile.name;

    if (/Controller\.js$/.test(file)) require(file)(app);
  });
};

export default initController;
