// file
import { lsdir } from 'qiao-file';

/**
 * init task
 * @param {*} options
 * @returns
 */
export default async (options) => {
  // check
  if (!options || !options.cron) return;

  // files
  const serverFiles = await lsdir(process.cwd());
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach((serverFile) => {
    operateTaskFile(options.cron, serverFile);
  });
};

// operate task file
function operateTaskFile(cron, serverFile) {
  const file = serverFile.path;

  if (/Task\.js$/.test(file)) {
    const task = require(file);
    if (!task || !task.time || !task.tick) return;

    if (task.runAndInit) {
      cron.runAndInit(task.time, task.tick);
    } else {
      cron.run(task.time, task.tick);
    }
  }
}
