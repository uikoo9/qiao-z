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
const clearIntervalRateLimit = (duration, interval) => {
  if (!global.rateLimitItems) {
    console.log('need global.rateLimitItems');
    return;
  }

  clearRateLimit(duration, interval);
};

// clear rate limit
function clearRateLimit(duration, interval) {
  const now = new Date();
  for (let i = global.rateLimitItems.length - 1; i >= 0; i--) {
    const item = global.rateLimitItems[i];
    if (now - item.time > duration) {
      global.rateLimitItems.splice(i, 1);
    }
  }
  console.log('clear rate limit items', global.rateLimitItems);

  setTimeout(() => {
    clearRateLimit(duration, interval);
  }, interval);
}

exports.clearIntervalRateLimit = clearIntervalRateLimit;
exports.rateLimit = rateLimit;
