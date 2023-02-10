const { shortLink } = require('../index.js');

/**
 * @jest-environment jsdom
 */
test('short link on browser', async () => {
  const link = await shortLink('https://insistime.com/');

  expect(link).toBeDefined();
});

/**
 * @jest-environment node
 */
test('short link on nodejs', async () => {
  const link = await shortLink('https://insistime.com/');

  expect(link).toBeDefined();
});
