'use strict';

var cron = require('cron');
var qiao_log_js = require('qiao.log.js');

// cron
const logger = qiao_log_js.Logger('qiao-timer');

/**
 * job
 * 	time
 * 	tick
 */
const job = (time, tick) => {
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
const run = (time, tick) => {
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
const runAndInit = (time, tick) => {
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

exports.job = job;
exports.run = run;
exports.runAndInit = runAndInit;
