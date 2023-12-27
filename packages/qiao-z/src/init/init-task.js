// file
import { lsdir } from 'qiao-file';

// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');
const methodName = 'initTask';

/**
 * init task
 * @param {*} options
 * @returns
 */
export default async (options) => {
  // check
  logger.info(methodName, 'options', options);
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
    logger.info(methodName, 'operateTaskFile', file);

    const task = require(file);
    logger.info(methodName, 'operateTaskFile', 'require success');
    if (!task || !task.time || !task.tick) return;

    if (task.runAndInit) {
      logger.info(methodName, 'operateTaskFile', 'runAndInit');
      cron.runAndInit(task.time, task.tick);
    } else {
      logger.info(methodName, 'operateTaskFile', 'run');
      cron.run(task.time, task.tick);
    }
  }
}
