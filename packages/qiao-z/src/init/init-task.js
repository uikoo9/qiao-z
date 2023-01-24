// file
import { lsdir } from 'qiao-file';

// timer
import { runAndInit } from 'qiao-timer';

/**
 * init task
 * @param {*} app
 * @returns
 */
const initTask = (app) => {
  // check
  if (!app) return;

  // files
  const serverFiles = lsdir(process.cwd() + '/');
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    const file = serverFile.path + serverFile.name;

    if (/Task\.js$/.test(file)) {
      const task = require(file);
      if (!task || !task.time || !task.tick) return;

      runAndInit(task.time, task.tick);
    }
  });
};

export default initTask;
