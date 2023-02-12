const { shortLink } = require('../index.js');

async function test() {
  const url = 'https://insistime.com/';
  const options = {
    timeout: 3000,
    info: true,
  };

  await shortLink(url, options);
}

test();
