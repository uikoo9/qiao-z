// qz
const qz = require('../index.js');

// app
const app = qz({
  cron: require('qiao-timer'),
});

// listen
app.listen();
