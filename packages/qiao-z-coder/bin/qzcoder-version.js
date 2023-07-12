// qiao
const { cmd } = require('qiao-cli');

// cmd for common
cmd
  .version(require('../package.json').version, '-v, --version')
  .description('qiao-z-coder, generate server and browser code.')
  .usage('<command>');
