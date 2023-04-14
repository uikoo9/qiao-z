// ava
const test = require('ava');

// cache
const { cache } = require('./index.js');

// test
test('cache on nodejs', async (t) => {
  // const
  const key = 'test';
  const value = 'hello';

  // set
  cache(key, value);

  // get
  const s = cache(key);
  t.is(s, value);

  // del
  cache(key, null);
  const ss = cache(key);
  t.falsy(ss);
});
