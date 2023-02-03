/**
 * init app
 * @param {*} app
 * @param {*} options
 * @returns
 */
const initApp = (app, options) => {
  if (!app || !options) return;

  // modules
  if (options.modules && options.config) {
    options.modules.forEach((m) => {
      m(app, options.config);
    });
  }

  // log
  if (options.log && options.logOptions) {
    app._log = options.log(options.logOptions);
  }

  // mysql
  if (options.mysql && options.config && options.config.db) {
    app._db = options.mysql(options.config.db);
  }

  // upload
  if (options.upload) {
    app._upload = options.upload;
  }
};

export default initApp;
