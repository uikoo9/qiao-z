// dayjs
const dayjs = require('dayjs');

// qiao
const { uuid } = require('qiao-encode');
const { cache } = require('qiao-cache');
const { cacheDict } = require('../../_constant.js');

// model
const { listRecommend, changeRecommend } = require('qiao-z-service');
const { listUserByIds } = require('../../user/model/UserItemModel.js');
const { updateUserPort } = require('../../pay/model/update-port.js');
const sql = require('../../pay/sql/pay-sql.json');

// config
const config = require('../../config.json');

// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-recommend');

/**
 * listRecommend
 * @param {*} req
 * @param {*} userId
 * @returns
 */
exports.listRecommend = async (req, userId) => {
  const methodName = 'listRecommend';

  // request
  try {
    const recommendRes = await listRecommend({
      url: config.recommend.url,
      appId: config.recommend.appId,
      appKey: config.recommend.appKey,
      userId: userId,
    });

    // check
    if (recommendRes.type !== 'success') {
      logger.error(methodName, recommendRes.msg);
      return;
    }

    // ids
    const ids = recommendRes.obj.map((item) => item.recommend_newuser_id);
    logger.info(methodName, 'ids', ids);

    // users
    const users = await listUserByIds(req, ids);
    if (!users) {
      logger.error(methodName, 'get users fail');
      return;
    }

    // r
    return users.map((user) => {
      const finalUser = {
        id: user.id,
        mobile: user.ucenter_user_name,
      };

      // r
      const recommend = recommendRes.obj.find((item) => item.recommend_newuser_id === `${user.id}`);
      if (recommend) finalUser.exchange = recommend.recommend_exchange;
      return finalUser;
    });
  } catch (error) {
    logger.error(methodName, error);
  }
};

/**
 * changeRecommend
 * @param {*} req
 * @param {*} userId
 * @param {*} newUserId
 * @returns
 */
exports.changeRecommend = async (req, userId, newUserId) => {
  const methodName = 'changeRecommend';

  // request
  try {
    const recommendRes = await changeRecommend({
      url: config.recommend.url,
      appId: config.recommend.appId,
      appKey: config.recommend.appKey,
      userId: userId,
      newUserId: newUserId,
    });

    // check
    if (recommendRes.type !== 'success') {
      logger.error(methodName, recommendRes.msg);
      return;
    }

    // r
    logger.info(methodName, 'change recommend ok');
    return true;
  } catch (error) {
    logger.error(methodName, error);
  }
};

/**
 * payRecommend
 * @param {*} req
 * @param {*} res
 * @param {*} userId
 * @returns
 */
exports.payRecommend = async (req, res, userId) => {
  const methodName = 'payRecommend';

  try {
    // trade
    const tradeOrder = `${uuid()}-${userId}`;
    const tradeTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    logger.info(methodName, 'tradeOrder', tradeOrder);
    logger.info(methodName, 'tradeTime', tradeTime);

    // db
    const params = [];
    params.push(tradeOrder);
    params.push('2');
    params.push('1');
    params.push('1');
    params.push('0');
    params.push(userId);
    params.push(userId);
    const addPayItem = await req.db.query(sql.addPayItem, params);
    logger.info(methodName, 'addPayItem', addPayItem);

    // update
    const updatePayItem = await req.db.query(sql.updatePayItem, [tradeTime, tradeOrder]);
    logger.info(methodName, 'updatePayItem', updatePayItem);

    // port
    const updateUserPortRes = await updateUserPort(req, res, userId, '1');
    cache(cacheDict['user.userPortList'], null);
    logger.info(methodName, 'updateUserPortRes', updateUserPortRes);

    // clear
    const cacheKey = `${cacheDict['user.userVip']}-${userId}`;
    cache(cacheKey, null);
    logger.info(methodName, 'cacheKey', cacheKey);

    // r
    return true;
  } catch (error) {
    logger.error(methodName, error);
  }
};
