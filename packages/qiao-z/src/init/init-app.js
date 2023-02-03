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
};

export default initApp;
