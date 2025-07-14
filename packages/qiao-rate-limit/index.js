'use strict';

/**
 * rateLimit
 * @param {*} ip
 * @param {*} maxCount
 * @returns
 */
const rateLimit = (ip, maxCount) => {
  if (!global.rateLimitItems) {
    console.log('need global.rateLimitItems');
    return;
  }

  // set
  const ipItem = global.rateLimitItems.find((item) => item.ip === ip);
  if (!ipItem) {
    console.log('init global.rateLimitItems');

    global.rateLimitItems.push({
      ip: ip,
      time: new Date(),
      count: 0,
    });

    return;
  }

  // check
  if (ipItem.count <= maxCount) {
    console.log('normal request');

    ipItem.count = ipItem.count + 1;

    return;
  }

  // r
  console.log('rate limit request');
  return true;
};

/**
 * clearIntervalRateLimit
 * @param {*} duration
 * @returns
 */
const clearIntervalRateLimit = (duration) => {
  if (!global.rateLimitItems) {
    console.log('need global.rateLimitItems');
    return;
  }

  setInterval(() => {
    const now = new Date();
    for (let i = global.rateLimitItems.length - 1; i >= 0; i--) {
      const item = global.rateLimitItems[i];
      const times = now - item.time;
      if (times > duration) {
        global.rateLimitItems.splice(i, 1);
      }
    }

    console.log('clear rate limit items', global.rateLimitItems);
  }, 1000);
};

exports.clearIntervalRateLimit = clearIntervalRateLimit;
exports.rateLimit = rateLimit;
