// model
const { cosToken, cosSign } = require('../model/CosModel.js');

/**
 * cosToken
 * @param {*} req
 * @param {*} res
 */
exports.cosToken = async (req, res) => {
  cosToken(req, res);
};

/**
 * cosSign
 * @param {*} req
 * @param {*} res
 */
exports.cosSign = async (req, res) => {
  cosSign(req, res);
};
