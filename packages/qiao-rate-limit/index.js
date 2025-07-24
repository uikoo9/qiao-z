'use strict';

var Debug = require('debug');

// logger
const debug = Debug('qiao-rate-limit');

/**
 * rateLimit
 * @param {*} ip
 * @param {*} maxCount
 * @returns
 */
const rateLimit = (ip, maxCount) => {
  const methodName = 'rateLimit';

  // check
  if (!global.rateLimitItems) {
    debug(methodName, 'need global.rateLimitItems');
    return;
  }

  // set
  const ipItem = global.rateLimitItems.find((item) => item.ip === ip);
  if (!ipItem) {
    debug(methodName, 'init global.rateLimitItems');

    global.rateLimitItems.push({
      ip: ip,
      time: new Date(),
      count: 1,
    });

    return;
  }

  // count
  ipItem.count = ipItem.count + 1;

  // check
  if (ipItem.count <= maxCount) {
    debug(methodName, 'normal request');
    return;
  } else {
    console.log(methodName, 'rate limit request');
    return true;
  }
};

/**
 * clearIntervalRateLimit
 * @param {*} duration
 * @param {*} interval
 * @param {*} maxCount
 * @returns
 */
const clearIntervalRateLimit = (duration, interval, maxCount, freezeTime) => {
  const methodName = 'clearIntervalRateLimit';

  // check
  if (!global.rateLimitItems) {
    debug(methodName, 'need global.rateLimitItems');
    return;
  }

  clearRateLimit(duration, interval, maxCount, freezeTime);
};

// clear rate limit
function clearRateLimit(duration, interval, maxCount, freezeTime) {
  const methodName = 'clearRateLimit';

  // go
  const now = new Date();
  for (let i = global.rateLimitItems.length - 1; i >= 0; i--) {
    const item = global.rateLimitItems[i];

    // 如果大于间隔时间，且小于最大命中次数，清空
    if (now - item.time > duration && item.count <= maxCount) {
      global.rateLimitItems.splice(i, 1);
    }

    // 如果大于冻结时间，清空
    if (now - item.time > freezeTime) {
      global.rateLimitItems.splice(i, 1);
    }
  }

  // log
  if (global.rateLimitItems.length) {
    debug(methodName, 'clear rate limit items', global.rateLimitItems);
  }

  setTimeout(() => {
    clearRateLimit(duration, interval, maxCount, freezeTime);
  }, interval);
}

exports.clearIntervalRateLimit = clearIntervalRateLimit;
exports.rateLimit = rateLimit;
