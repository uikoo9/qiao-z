// cros options
const crosOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

/**
 * init plugins
 * @param {*} options
 * @returns
 */
export default (options) => {
  const plugins = {};

  // checks
  if (options && options.checks) {
    plugins.checks = options.checks;
  }

  // cros
  if (options && options.cros) {
    plugins.cros = options.cros === true ? crosOptions : options.cros;
  }

  // logger
  if (options && options.log && options.logOptions) {
    plugins.logger = options.log(options.logOptions);
  }

  // mysql
  if (options && options.mysql && options.config && options.config.db) {
    plugins.db = options.mysql(options.config.db);
  }

  // upload
  if (options && options.upload) {
    plugins.upload = options.upload;
  }

  return plugins;
};
