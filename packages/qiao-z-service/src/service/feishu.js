// util
import { fetch } from '../util/fetch.js';

/**
 * sendMsgToFeishu
 * @param {*} options
 * @returns
 */
export const sendMsgToFeishu = async (options) => {
  // content
  const content = JSON.stringify({
    post: {
      zh_cn: {
        content: [
          [
            {
              tag: 'text',
              text: options.feishuMsg,
            },
          ],
        ],
      },
    },
  });

  return await fetch(options.url, {
    appId: options.appId,
    appKey: options.appKey,
    url: options.feishuUrl,
    content: content,
  });
};
