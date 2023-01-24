const q = require('../index.js');

const test = function () {
  const time = '*/1 * * * * *';
  const tick = function () {
    console.log(new Date());
  };

  console.log('-' + new Date());
  q.run(time, tick);
};

test();
