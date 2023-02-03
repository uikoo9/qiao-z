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

  // upload
  if (options.upload) {
    app._upload = options.upload;
  }
};

export default initApp;
