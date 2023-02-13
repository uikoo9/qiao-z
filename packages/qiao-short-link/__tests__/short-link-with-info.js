const { shortLink } = require('../index.js');

async function test() {
  const url = 'https://insistime.com/';
  const options = {
    timeout: 300,
    info: true,
  };

  await shortLink(url, options);
}

test();
