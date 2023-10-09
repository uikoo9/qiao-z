// json
const { rollupPluginJson } = require('qiao-project');

/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: ['qiao-ajax', 'qiao-json'],
  plugins: [rollupPluginJson()],
};
