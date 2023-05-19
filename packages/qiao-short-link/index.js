'use strict';

var qiaoAjax = require('qiao-ajax');
var qs = require('qs');

// qiao-ajax

/**
 * gotiny.cc
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
const goTinyCC = async (longLink, timeout) => {
  // check
  if (!longLink) return;

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
    if (!res || res.status !== 200 || !res.data || !res.data.length || res.data[0].long !== longLink) return;

    return `https://gotiny.cc/${res.data[0].code}`;
  } catch (error) {
    console.log(error);
  }
};

// qs

/**
 * tiyee.cn
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
const tiyeeCN = async (longLink, timeout) => {
  // check
  if (!longLink) return;

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
    if (!res || res.status !== 200 || !res.data) return;

    return `https://${res.data.short_url}`;
  } catch (error) {
    console.log(error);
  }
};

// short links

// default timeout
const defaultTimeout = 300;

/**
 * short link race
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
const shortLinkRace = async (longLink, timeout) => {
  // timeout
  timeout = timeout || defaultTimeout;

  return new Promise((resolve, reject) => {
    const errors = [];

    // tiyee.cn
    tiyeeCN(longLink, timeout)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push(e);
      });

    // gotiny.cc
    goTinyCC(longLink, timeout)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        errors.push(e);
      });

    // errors
    setTimeout(() => {
      if (errors && errors.length) reject(errors);
    }, timeout + 50);
  });
};

// short link

/**
 * short link
 * @param {*} longLink
 * @param {*} timeout
 * @returns
 */
const shortLink = (longLink, timeout) => {
  return shortLinkRace(longLink, timeout);
};

exports.shortLink = shortLink;
