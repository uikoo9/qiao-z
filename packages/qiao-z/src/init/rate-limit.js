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

  // rate limit
  const rateLimitRes = rateLimit(ip, rateLimitMaxCount);
  if (rateLimitRes) {
    res.jsonFail('rate limit');
    return;
  }

  // r
  return true;
};
