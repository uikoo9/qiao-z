/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/app.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: [
    'art-template',
    'cookie',
    'debug',
    'http',
    'parseurl',
    'path',
    'qiao-file',
    'qiao-timer',
    'qiao-ua',
    'qiao-json',
    'qs',
    'raw-body',
  ],
};
