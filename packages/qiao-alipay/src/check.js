/**
 * check
 * @param {*} app
 * @returns
 */
export const check = async (app) => {
  // q
  const result = await app.alipay.curl('POST', '/v3/alipay/user/deloauth/detail/query', {
    body: {
      date: '20230102',
      offset: 20,
      limit: 1,
    },
  });

  // r
  return result && result.responseHttpStatus === 200;
};
