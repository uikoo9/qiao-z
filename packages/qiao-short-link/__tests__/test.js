// ava
const test = require('ava');

// jsdom
const { JSDOM } = require('jsdom');

// link
const { shortLink } = require('../index.js');

// nodejs
test.skip('get ip on nodejs', async (t) => {
  t.timeout(450);

  const link = await shortLink('https://insistime.com/', 500);
  t.log(link);
  t.truthy(link);
});

// browser
test.skip('get ip on browser', async (t) => {
  t.timeout(450);

  const dom = new JSDOM('', { url: 'http://localhost' });
  global.document = dom.window.document;

  const link = await shortLink('https://insistime.com/', 500);
  t.log(link);
  t.truthy(link);
});
