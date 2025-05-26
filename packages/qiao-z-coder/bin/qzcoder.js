#!/usr/bin/env node

// qiao
const cli = require('qiao-cli');

// cmds
require('./qzcoder-init.js');
require('./qzcoder-gen.js');
require('./qzcoder-gen1.js');
require('./qzcoder-version.js');

// parse
cli.cmd.parse(process.argv);
