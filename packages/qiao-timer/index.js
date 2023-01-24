'use strict';

var cron = require('cron');

// cron

/**
 * job
 * 	time
 * 	tick
 */
const job = (time, tick) => {
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
const run = (time, tick) => {
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
const runAndInit = (time, tick) => {
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

exports.job = job;
exports.run = run;
exports.runAndInit = runAndInit;
