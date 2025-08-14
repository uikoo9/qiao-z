// qiao
const { randomNumber } = require('qiao-encode');
const { sendSms } = require('qiao-z-service');

/**
 * sms
 * @param {*} req
 * @param {*} res
 */
exports.sms = async (req, res) => {
  // const
  const mobile = req.body.mobile;
  const code = randomNumber(6);
  const content = `【北京洵美且好科技有限公司】验证码：${code}，如非本人操作，请忽略此短信。`;

  // send
  const json = await sendSms(
    Object.assign(global.QZ_CONFIG.sms, {
      mobile: mobile,
      content: content,
    }),
  );
  if (json.type === 'success') {
    if (!req.redis) {
      res.jsonFail('/sms, need req.redis');
      return;
    }

    const redisRes = await req.redis.set(`code-${mobile}`, code);
    if (!redisRes) {
      res.jsonFail('/sms, set redis fail');
      return;
    }
  }

  // send
  res.json(json);
};
