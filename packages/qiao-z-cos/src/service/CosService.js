// user
const { checkUserAuthByReq } = require('qiao-z-user');

// model
const { cosToken, cosSign } = require('../model/CosModel.js');

/**
 * cosToken
 * @param {*} req
 * @param {*} res
 */
exports.cosToken = async (req, res) => {
  // check user
  const checkUserRes = await checkUserAuthByReq(req, res);
  if (!checkUserRes) return;

  // token
  cosToken(req, res);
};

/**
 * cosSign
 * @param {*} req
 * @param {*} res
 */
exports.cosSign = async (req, res) => {
  // check user
  const checkUserRes = await checkUserAuthByReq(req, res);
  if (!checkUserRes) return;

  // sign
  cosSign(req, res);
};
