const { shortLink } = require('../index.js');

async function test() {
  const url = 'https://insistime.com/';
  const options = {
    info: true,
  };

  await shortLink(url, options);
}

test();
