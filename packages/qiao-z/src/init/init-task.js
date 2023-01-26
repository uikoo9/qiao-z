// file
import { lsdir } from 'qiao-file';

/**
 * init task
 * @param {*} app
 * @returns
 */
export default (app) => {
  // check
  if (!app || !app._cron) return;

  // files
  const serverFiles = lsdir(process.cwd() + '/');
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    operateTaskFile(app, serverFile);
  });
};

// operate task file
function operateTaskFile(app, serverFile) {
  const file = serverFile.path + serverFile.name;

  if (/Task\.js$/.test(file)) {
    const task = require(file);
    if (!task || !task.time || !task.tick) return;

    if (task.runAndInit) {
      app._cron.runAndInit(task.time, task.tick);
    } else {
      app._cron.run(task.time, task.tick);
    }
  }
}
