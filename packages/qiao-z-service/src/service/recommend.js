// ajax
import { post } from 'qiao-ajax';

// json
import json from 'qiao-json';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z-service');

/**
 * addRecommend
 * @param {*} options
 * @returns
 */
export const addRecommend = async (options) => {
  const methodName = 'addRecommend';

  // const
  const url = options.url + 'recommend/add';
  const appId = options.appId;
  const appKey = options.appKey;
  const userId = options.userId;
  const newUserId = options.newUserId;
  logger.info(methodName, 'options', options);

  // send
  try {
    const recommendRes = await post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        userId: userId,
        newUserId: newUserId,
      },
    });

    // check
    if (recommendRes.status !== 200) {
      logger.error(methodName, 'recommendRes', recommendRes);
      return json.fail(`recommendRes.status is ${recommendRes.status}`);
    }
    if (recommendRes.data.type !== 'success') {
      logger.error(methodName, 'recommendRes', recommendRes);
      return json.fail(recommendRes.data.msg);
    }

    // r
    return json.success(recommendRes.data.msg);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('add recommend network error');
  }
};

/**
 * listRecommend
 * @param {*} options
 * @returns
 */
export const listRecommend = async (options) => {
  const methodName = 'listRecommend';

  // const
  const url = options.url + 'recommend/list';
  const appId = options.appId;
  const appKey = options.appKey;
  const userId = options.userId;
  logger.info(methodName, 'options', options);

  // send
  try {
    const recommendRes = await post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        userId: userId,
      },
    });

    // check
    if (recommendRes.status !== 200) {
      logger.error(methodName, 'recommendRes', recommendRes);
      return json.fail(`recommendRes.status is ${recommendRes.status}`);
    }
    if (recommendRes.data.type !== 'success') {
      logger.error(methodName, 'recommendRes', recommendRes);
      return json.fail(recommendRes.data.msg);
    }

    // r
    return json.success(recommendRes.data.msg);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('list recommend network error');
  }
};

/**
 * changeRecommend
 * @param {*} options
 * @returns
 */
export const changeRecommend = async (options) => {
  const methodName = 'changeRecommend';

  // const
  const url = options.url + 'recommend/change';
  const appId = options.appId;
  const appKey = options.appKey;
  const userId = options.userId;
  const newUserId = options.newUserId;
  logger.info(methodName, 'options', options);

  // send
  try {
    const recommendRes = await post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        userId: userId,
        newUserId: newUserId,
      },
    });

    // check
    if (recommendRes.status !== 200) {
      logger.error(methodName, 'recommendRes', recommendRes);
      return json.fail(`recommendRes.status is ${recommendRes.status}`);
    }
    if (recommendRes.data.type !== 'success') {
      logger.error(methodName, 'recommendRes', recommendRes);
      return json.fail(recommendRes.data.msg);
    }

    // r
    return json.success(recommendRes.data.msg);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('change recommend network error');
  }
};
