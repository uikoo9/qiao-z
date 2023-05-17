// ava
const test = require('ava');

// jsdom
const { JSDOM } = require('jsdom');

// link
const { shortLink } = require('../index.js');

// options
const options = { timeout:2000 };

// nodejs
test.serial('get ip on nodejs', async (t) => {
  const link = await shortLink('https://insistime.com/', options);
  t.log(link);
  t.truthy(link);
});

// browser
test.serial('get ip on browser', async (t) => {
  const dom = new JSDOM('', { url: 'http://localhost' });
  global.document = dom.window.document;

  const link = await shortLink('https://insistime.com/', options);
  t.log(link);
  t.truthy(link);
});
