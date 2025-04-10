// qiao
import { post } from 'qiao-ajax';
import { uuid } from 'qiao-encode';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-review');

/**
 * reviewByShumei
 *  https://help.ishumei.com/docs/tj/text/versionV4/sync/developDoc
 *  https://help.ishumei.com/docs/tj/image/versionV4/syncSingle/developDoc/
 * @param {*} options
 * @returns
 */
export const reviewByShumei = async (options) => {
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
  if (!options.text && !options.img && !options.imgs) {
    const msg = 'need options.text or options.img or options.imgs';
    logger.error(methodName, msg);
    return;
  }
  if (!options.tokenId) {
    const msg = 'need options.tokenId';
    logger.error(methodName, msg);
    return;
  }

  // go
  try {
    // review data
    const reviewData = { tokenId: options.tokenId };
    if (options.text) reviewData.text = options.text;
    if (options.img) reviewData.img = options.img;
    if (options.imgs) {
      reviewData.imgs = options.imgs.map((item) => {
        const btid = uuid().split('-').join('').substring(0, 30);
        return {
          btid: btid,
          img: item,
        };
      });
    }

    // all data
    const allData = {
      appId: options.appId,
      accessKey: options.accessKey,
      eventId: options.eventId,
      type: options.type,
      data: reviewData,
    };
    logger.error(methodName, 'allData', allData);

    // review
    const res = await post(options.url, {
      data: allData,
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
    return options.imgs ? res.data.imgs : res.data.riskLevel;
  } catch (error) {
    logger.error(methodName, error);
  }
};
