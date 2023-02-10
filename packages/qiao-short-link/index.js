'use strict';

var qiaoAjax = require('qiao-ajax');
var qs = require('qs');

// qiao-ajax

/**
 * gotiny.cc
 * @param {*} longLink
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
const goTinyCC = async (longLink, timeout, info) => {
  // time
  const timeStr = 'short link by gotiny.cc';
  if (info) console.time(timeStr);

  // check
  if (!longLink) {
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} failed: need long link`);
      console.log();
    }

    return;
  }

  // url
  const url = 'https://gotiny.cc/api';

  // config
  const config = {
    headers: { 'content-type': 'application/json' },
    data: { input: longLink },
    timeout,
  };

  // post
  try {
    const res = await qiaoAjax.post(url, config);
    if (!res || res.status !== 200 || !res.data || !res.data.length || res.data[0].long !== longLink) {
      if (info) {
        console.timeEnd(timeStr);
        console.log(`${timeStr} failed: request failed`);
        console.log();
      }

      return;
    }

    // return
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} success: https://gotiny.cc/${res.data[0].code}`);
      console.log();
    }
    return `https://gotiny.cc/${res.data[0].code}`;
  } catch (error) {
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} failed: ${error.message}`);
      console.log();
    }
  }
};

// qs

/**
 * tiyee.cn
 * @param {*} longLink
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
const tiyeeCN = async (longLink, timeout, info) => {
  // time
  const timeStr = 'short link by tiyee.cn';
  if (info) console.time(timeStr);

  // check
  if (!longLink) {
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} failed: need long link`);
      console.log();
    }

    return;
  }

  // url
  const url = 'https://tiyee.cn/2/create_short_url';

  // config
  const config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({ url: longLink }),
    timeout,
  };

  // post
  try {
    const res = await qiaoAjax.post(url, config);
    if (!res || res.status !== 200 || !res.data) {
      if (info) {
        console.timeEnd(timeStr);
        console.log(`${timeStr} failed: request failed`);
        console.log();
      }

      return;
    }

    // return
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} success: ${res.data.short_url}`);
      console.log();
    }
    return res.data.short_url;
  } catch (error) {
    if (info) {
      console.timeEnd(timeStr);
      console.log(`${timeStr} failed: ${error.message}`);
      console.log();
    }
  }
};

// short links

// default timeout
const defaultTimeout = 200;

/**
 * short link race
 * @param {*} longLink
 * @param {*} timeout
 * @param {*} info
 * @returns
 */
const shortLinkRace = async (longLink, timeout, info) => {
  // timeout
  timeout = timeout || defaultTimeout;

  return new Promise((resolve) => {
    const errors = [];

    // tiyee.cn
    tiyeeCN(longLink, timeout, info)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push({
          name: 'tiyee.cn',
          error: e.message,
        });
      });

    // gotiny.cc
    goTinyCC(longLink, timeout, info)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push({
          name: 'gotiny.cc',
          error: e.message,
        });
      });

    // errors
    if (!info) return;
    setTimeout(() => {
      if (errors && errors.length) {
        console.log('errros:');
        console.log(errors);
      }
    }, timeout + 50);
  });
};

// short link

/**
 * short link
 * @param {*} longLink
 * @param {*} options
 * @returns
 */
const shortLink = (longLink, options) => {
  options = options || {};
  return shortLinkRace(longLink, options.timeout, options.info);
};

exports.shortLink = shortLink;
