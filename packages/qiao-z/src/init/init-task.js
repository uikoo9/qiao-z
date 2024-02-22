// file
import { lsdir } from 'qiao-file';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
const methodName = 'initTask';

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
    debug(methodName, 'operateTaskFile', file);

    const task = require(file);
    debug(methodName, 'operateTaskFile', 'require success');
    if (!task || !task.time || !task.tick) return;

    if (task.runAndInit) {
      debug(methodName, 'operateTaskFile', 'runAndInit');
      cron.runAndInit(task.time, task.tick);
    } else {
      debug(methodName, 'operateTaskFile', 'run');
      cron.run(task.time, task.tick);
    }
  }
}
