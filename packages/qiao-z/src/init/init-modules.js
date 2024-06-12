/**
 * init modules
 * @param {*} app
 * @param {*} options
 * @returns
 */
const initModules = (app, options) => {
  if (!app || !options || !options.modules) return;

  // modules
  options.modules.forEach((m) => {
    m(app);
  });
};

export default initModules;
