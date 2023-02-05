const { getIP } = require('../index.js');

async function test() {
  await getIP({
    timeout: 300,
    info: true,
  });
}

test();
