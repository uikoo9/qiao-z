const { rollupNodeResolve } = require('qiao-project');

/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: ['qiao-ajax'],
  plugins: [
    rollupNodeResolve({
      resolveOnly: ['ip-regex'],
    }),
  ],
};
