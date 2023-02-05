const { getIP } = require('../index.js');

async function test() {
  const ip = await getIP({
    info: true,
  });

  console.log(ip);
}

test();
