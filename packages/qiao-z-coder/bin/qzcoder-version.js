// qiao
const cli = require('qiao-cli');

// cmd for common
cli.cmd
  .version(require('../package.json').version, '-v, --version')
  .description('qiao-z-coder, generate server and browser code.')
  .usage('<command>');
