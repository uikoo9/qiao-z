/**
 * res.head
 * @param {*} res
 * @param {*} status
 * @param {*} options
 * @returns
 */
const head = (res, status, options) => {
  // check
  if (!res) return;

  // heads
  res.heads = {
    status: status,
    options: options,
  };
};

export default head;
