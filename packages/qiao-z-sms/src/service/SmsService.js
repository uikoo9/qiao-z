// qiao
const { cache } = require('qiao-cache');
const { randomNumber } = require('qiao-encode');
const { sendSms } = require('qiao-z-service');

/**
 * userSendCode
 * @param {*} req
 * @param {*} res
 */
exports.userSendCode = async (req, res) => {
  // const
  const mobile = req.body.mobile;
  const code = randomNumber(6);
  const content = `【小楼AI】验证码：${code}，如非本人操作，请忽略此短信。`;

  // send
  const json = await sendSms(
    Object.assign(global.QZ_CONFIG.sms, {
      mobile: mobile,
      content: content,
    }),
  );
  if (json.type === 'success') cache(`code-${mobile}`, code);

  // send
  res.json(json);
};
