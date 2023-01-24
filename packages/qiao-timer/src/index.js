// cron
import cron from 'cron';

/**
 * job
 * 	time
 * 	tick
 */
export const job = (time, tick) => {
  // check
  if (!time) {
    console.log('need time params!');
    return;
  }
  if (!tick) {
    console.log('need tick params!');
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
    console.log('need time params!');
    return;
  }
  if (!tick) {
    console.log('need tick params!');
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
    console.log('need time params!');
    return;
  }
  if (!tick) {
    console.log('need tick params!');
    return;
  }

  // init
  tick();

  // return
  return run(time, tick);
};
