// ajax
import { post } from 'qiao-ajax';

// json
import json from 'qiao-json';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z-service');

/**
 * sendMsgToFeishu
 */
export const sendMsgToFeishu = async (options) => {
  const methodName = 'sendMsgToFeishu';

  // const
  const url = options.url;
  const appId = options.appId;
  const appKey = options.appKey;
  const feishuUrl = options.feishuUrl;
  const feishuMsg = options.feishuMsg;
  logger.info(methodName, 'options', options);

  // content
  const content = JSON.stringify({
    post: {
      zh_cn: {
        content: [
          [
            {
              tag: 'text',
              text: feishuMsg,
            },
          ],
        ],
      },
    },
  });

  // go
  try {
    const feishuRes = await post(url, {
      data: {
        appId: appId,
        appKey: appKey,
        url: feishuUrl,
        content: content,
      },
    });

    // check
    if (feishuRes.status !== 200) {
      logger.fail(methodName, 'feishuRes', feishuRes);
      return json.fail(`feishuRes.status is ${feishuRes.status}`);
    }
    if (feishuRes.data.type !== 'success') {
      logger.fail(methodName, 'smsRes', feishuRes);
      return json.fail(feishuRes.data.msg);
    }

    // r
    return json.success(feishuRes.data.msg);
  } catch (error) {
    logger.error(methodName, error);
    return json.fail('send msg to feishu network error');
  }
};
