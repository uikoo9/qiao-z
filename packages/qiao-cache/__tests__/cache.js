// cache
const { cache } = require('../index.js');

// test
test('cache on nodejs', async () => {
  // const
  const key = 'test';
  const value = 'hello';

  // set
  cache(key, value);

  // get
  const s = cache(key);
  expect(s).toEqual(value);

  // del
  cache(key, null);
  const ss = cache(key);
  expect(ss).toBeUndefined();
});
