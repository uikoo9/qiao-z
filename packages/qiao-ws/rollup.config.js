/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/app.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: ['bufferutil', 'qiao.log.js', 'utf-8-validate', 'ws'],
};
