const q = require('../index.js');

const test = function () {
  const time = '*/1 * * * * *';
  const tick = function () {
    console.log(new Date());
  };

  const job = q.job(time, tick);
  console.log(job);
};

test();
