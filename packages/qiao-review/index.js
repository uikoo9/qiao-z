'use strict';

var qiaoAjax = require('qiao-ajax');
var qiao_log_js = require('qiao.log.js');

// qiao
const logger = qiao_log_js.Logger('qiao-review');

/**
 * reviewByShumei
 *  https://help.ishumei.com/docs/tj/text/versionV4/sync/developDoc
 *  https://help.ishumei.com/docs/tj/image/versionV4/syncSingle/developDoc/
 * @param {*} options
 * @returns
 */
const reviewByShumei = async (options) => {
  const methodName = 'reviewByShumei';

  // check
  if (!options) {
    const msg = 'need options';
    logger.error(methodName, msg);
    return;
  }
  if (!options.url) {
    const msg = 'need options.url';
    logger.error(methodName, msg);
    return;
  }
  if (!options.appId) {
    const msg = 'need options.appId';
    logger.error(methodName, msg);
    return;
  }
  if (!options.accessKey) {
    const msg = 'need options.accessKey';
    logger.error(methodName, msg);
    return;
  }
  if (!options.eventId) {
    const msg = 'need options.eventId';
    logger.error(methodName, msg);
    return;
  }
  if (!options.type) {
    const msg = 'need options.type';
    logger.error(methodName, msg);
    return;
  }
  if (!options.text && !options.img) {
    const msg = 'need options.text or options.img';
    logger.error(methodName, msg);
    return;
  }
  if (!options.tokenId) {
    const msg = 'need options.tokenId';
    logger.error(methodName, msg);
    return;
  }
  logger.error(methodName, options);

  // go
  try {
    // data
    const reviewData = { tokenId: options.tokenId };
    if (options.text) reviewData.text = options.text;
    if (options.img) reviewData.img = options.img;

    // review
    const res = await qiaoAjax.post(options.url, {
      data: {
        appId: options.appId,
        accessKey: options.accessKey,
        eventId: options.eventId,
        type: options.type,
        data: {
          text: options.text,
          tokenId: options.tokenId,
        },
      },
    });
    if (!res || res.status !== 200) {
      const msg = `ajax fail: ${res}`;
      logger.error(methodName, msg);
      return;
    }
    if (res.data.code !== 1100) {
      logger.error(methodName, res.data.message);
      return;
    }

    // return
    return res.data.riskLevel === 'PASS';
  } catch (error) {
    logger.error(methodName, error);
  }
};

exports.reviewByShumei = reviewByShumei;
