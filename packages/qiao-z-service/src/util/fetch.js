// ajax
import { post } from 'qiao-ajax';

// json
import json from 'qiao-json';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z-service');

/**
 * fetch
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @returns
 */
export const fetch = async (url, data, headers) => {
  const methodName = 'fetch';

  // send
  try {
    const res = await post(url, {
      headers: headers,
      data: data,
    });

    // check
    if (res.status !== 200) {
      logger.error(methodName, 'res', res);
      return json.fail(`res.status is ${res.status}`);
    }
    if (res.data.type !== 'success') {
      logger.error(methodName, 'res', res);
      return json.fail(res.data.msg);
    }

    // r
    return json.success(res.data.msg, res.data.obj);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('fetch network error');
  }
};
