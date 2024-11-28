// user
const { checkUserAuthByReq } = require('qiao-z-user');

// model
const { listRecommend, changeRecommend, payRecommend } = require('../model/RecommendModel.js');

// Logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-z-recommend');

/**
 * recommendList
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.recommendList = async (req, res) => {
  const methodName = 'recommendList';

  // check user
  const checkUserRes = await checkUserAuthByReq(req, res);
  if (!checkUserRes) return;

  // const
  const userId = req.query.userid || req.cookies.userid || req.headers.userid;
  logger.info(methodName, 'userId', userId);

  // list
  const list = await listRecommend(req, userId);
  res.jsonSuccess('list success', list || []);
};

/**
 * recommendChange
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.recommendChange = async (req, res) => {
  const methodName = 'recommendChange';

  // mobile
  const newUserId = req.body.newUserId;
  if (!newUserId) {
    const msg = 'need new user id';
    logger.error(methodName, msg);
    res.jsonFail(msg);
    return;
  }

  // check user
  const checkUserRes = await checkUserAuthByReq(req, res);
  if (!checkUserRes) return;

  // const
  const userId = req.query.userid || req.cookies.userid || req.headers.userid;
  logger.info(methodName, 'userId', userId);

  // change
  const changeRecommendRes = await changeRecommend(req, userId, newUserId);
  if (!changeRecommendRes) {
    const msg = 'change recommend fail';
    req.logger.error(methodName, msg);
    res.jsonFail(msg);
    return;
  }

  // pay
  const payRecommendRes = await payRecommend(req, res, userId);
  if (!payRecommendRes) {
    const msg = 'change recommend fail';
    req.logger.error(methodName, msg);
    res.jsonFail(msg);
    return;
  }

  // r
  const msg = 'change recommend success';
  logger.info(methodName, msg);
  res.jsonSuccess(msg);
};
