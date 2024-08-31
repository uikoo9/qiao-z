// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-alipay');

/**
 * pay
 * @param {*} app
 * @param {*} options
 * @returns
 */
export const pay = async (app, options) => {
  const methodName = 'pay';

  // check
  if (!options) {
    logger.error(methodName, 'need options');
    return;
  }
  if (!options.tradeTitle) {
    logger.error(methodName, 'need options.tradeTitle');
    return;
  }
  if (!options.tradeOrder) {
    logger.error(methodName, 'need options.tradeOrder');
    return;
  }
  if (!options.tradeAmount) {
    logger.error(methodName, 'need options.tradeAmount');
    return;
  }
  if (!options.payMode) {
    logger.error(methodName, 'need options.payMode');
    return;
  }
  if (!options.returnUrl) {
    logger.error(methodName, 'need options.returnUrl');
    return;
  }

  // content
  const bizContent = {
    product_code: 'FAST_INSTANT_TRADE_PAY',
    subject: options.tradeTitle,
    out_trade_no: options.tradeOrder,
    total_amount: options.tradeAmount,
    qr_pay_mode: options.payMode,
  };
  if (options.payMode === '4') bizContent.qrcode_width = options.qrcodeWidth || 100;
  logger.info(methodName, 'bizContent', bizContent);

  // html
  try {
    // query options
    const queryOptions = {
      bizContent,
      returnUrl: options.returnUrl,
    };
    if (options.notifyUrl) queryOptions.notify_url = options.notifyUrl;
    logger.info(methodName, 'queryOptions', queryOptions);

    // r
    return app.alipay.pageExecute('alipay.trade.page.pay', 'POST', queryOptions);
  } catch (error) {
    logger.error(methodName, 'error', error);
  }
};
