const { getIP } = require('../index.js');

/**
 * @jest-environment jsdom
 */
test('get ip on browser', async () => {
  const ip = await getIP();
  expect(ip).toBeDefined();
});

/**
 * @jest-environment node
 */
test('get ip on nodejs', async () => {
  const ip = await getIP();
  expect(ip).toBeDefined();
});
