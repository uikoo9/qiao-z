/**
 * rateLimitCheck
 * @param {*} req
 * @param {*} res
 * @param {*} rateLimit
 * @param {*} rateLimitMaxCount
 * @returns
 */
export const rateLimitCheck = (req, res, rateLimit, rateLimitMaxCount) => {
  // ip
  const ip = req.ip;
  if (!ip) return true;

  // rateLimitKey
  const userid = req.headers?.userid;
  const rateLimitKey = userid ? `${ip}-${userid}` : ip;

  // rate limit
  const rateLimitRes = rateLimit(rateLimitKey, rateLimitMaxCount);
  if (rateLimitRes) {
    res.jsonFail('rate limit');
    return;
  }

  // r
  return true;
};
