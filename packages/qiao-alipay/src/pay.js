// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-alipay');

/**
 * pay
 * @param {*} app
 * @param {*} tradeTitle
 * @param {*} tradeOrder
 * @param {*} tradeAmount
 * @param {*} payMode
 * @param {*} returnUrl
 * @returns
 */
export const pay = async (app, tradeTitle, tradeOrder, tradeAmount, payMode, returnUrl) => {
  const methodName = 'pay';

  // check
  if (!tradeTitle) {
    logger.error(methodName, 'need tradeTitle');
    return;
  }
  if (!tradeOrder) {
    logger.error(methodName, 'need tradeOrder');
    return;
  }
  if (!tradeAmount) {
    logger.error(methodName, 'need tradeAmount');
    return;
  }
  if (!payMode) {
    logger.error(methodName, 'need payMode');
    return;
  }
  if (!returnUrl) {
    logger.error(methodName, 'need returnUrl');
    return;
  }

  // content
  const bizContent = {
    product_code: 'FAST_INSTANT_TRADE_PAY',
    subject: tradeTitle,
    out_trade_no: tradeOrder,
    total_amount: tradeAmount,
    qr_pay_mode: payMode,
  };
  logger.info(methodName, 'bizContent', bizContent);

  // html
  return app.alipay.pageExecute('alipay.trade.page.pay', 'POST', {
    bizContent,
    returnUrl: returnUrl,
  });
};
