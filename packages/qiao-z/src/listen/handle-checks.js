/**
 * handle checks
 * @param {*} plugins
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleChecks = async (plugins, req, res) => {
  // check
  if (!plugins || !plugins.checks || !plugins.checks.length) return;

  // check
  let r;
  for (let i = 0; i < plugins.checks.length; i++) {
    const check = plugins.checks[i];
    const checkRes = await check(req, res);
    if (checkRes) continue;

    r = true;
    break;
  }

  // return
  return r;
};

export default handleChecks;
