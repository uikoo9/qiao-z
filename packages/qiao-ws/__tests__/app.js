// qz
const qz = require('../index.js');

// start
(async function(){
  const app = await qz({
    // cron: require('qiao-timer'),
  });
  
  // listen
  app.listen();
})();
