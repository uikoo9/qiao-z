// cron
import cron from 'cron';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-timer');

/**
 * job
 * 	time
 * 	tick
 */
export const job = (time, tick) => {
  // check
  if (!time) {
    logger.info('job', 'need time params!');
    return;
  }
  if (!tick) {
    logger.info('job', 'need tick params!');
    return;
  }

  // return
  return new cron.CronJob(time, tick);
};

/**
 * run
 * 	time
 * 	tick
 */
export const run = (time, tick) => {
  // check
  if (!time) {
    logger.info('run', 'need time params!');
    return;
  }
  if (!tick) {
    logger.info('run', 'need tick params!');
    return;
  }

  // run
  const myJob = job(time, tick);
  myJob.start();

  // return
  return myJob;
};

/**
 * run and init
 * 	time
 * 	tick
 */
export const runAndInit = (time, tick) => {
  // check
  if (!time) {
    logger.info('runAndInit', 'need time params!');
    return;
  }
  if (!tick) {
    logger.info('runAndInit', 'need tick params!');
    return;
  }

  // init
  tick();

  // return
  return run(time, tick);
};
