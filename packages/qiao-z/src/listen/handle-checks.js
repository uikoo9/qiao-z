/**
 * handle checks
 * @param {*} routers
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleChecks = async (options, req, res) => {
  // check
  if (!options || !options.checks || !options.checks.length) return;

  // check
  let r;
  for (let i = 0; i < options.checks.length; i++) {
    const check = options.checks[i];
    const checkRes = await check(req, res);
    if (checkRes) continue;

    r = true;
    break;
  }

  // return
  return r;
};

export default handleChecks;
