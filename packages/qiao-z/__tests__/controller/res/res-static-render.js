/**
 * res render static
 */
module.exports = function (app) {
  app.get('/res/static/render', async function (req, res) {
    const filePath = './views/index.html';
    const isStatic = await res.staticRender(filePath);
    if(isStatic) return;

    //
    res.render(filePath, { data: 'hello' }, true);
  });
};
