// ava
const test = require('ava');

// jsdom
const { JSDOM } = require('jsdom');

// ip
const { getIP } = require('../index.js');

// nodejs
test.serial('get ip on nodejs', async (t) => {
  const ip = await getIP(2000);
  t.log(ip);
  t.truthy(ip);
});

// browser
test.serial('get ip on browser', async (t) => {
  const dom = new JSDOM('', { url: 'http://localhost' });
  global.document = dom.window.document;

  const ip = await getIP(2000);
  t.log(ip);
  t.truthy(ip);
});
