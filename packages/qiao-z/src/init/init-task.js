// file
import { lsdir } from 'qiao-file';

/**
 * init task
 * @param {*} app
 * @returns
 */
const initTask = (app) => {
  // check
  if (!app || !app._cron || !app._cron.runAndInit) return;

  // files
  const serverFiles = lsdir(process.cwd() + '/');
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    const file = serverFile.path + serverFile.name;

    if (/Task\.js$/.test(file)) {
      const task = require(file);
      if (!task || !task.time || !task.tick) return;

      app._cron.runAndInit(task.time, task.tick);
    }
  });
};

export default initTask;
