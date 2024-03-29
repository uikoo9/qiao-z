/**
 * init modules
 * @param {*} app
 * @param {*} options
 * @returns
 */
const initModules = (app, options) => {
  if (!app || !options || !options.modules || !options.config) return;

  // modules
  options.modules.forEach((m) => {
    m(app, options.config);
  });
};

export default initModules;
