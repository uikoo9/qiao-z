const { getIP } = require('../index.js');

async function test() {
  const ip = await getIP({
    timeout: 300,
    info: true,
  });

  console.log(ip);
}

test();
