/**
 * res render static
 */
module.exports = function (app) {
  app.get('/res/render/static', function (req, res) {
    const data = 'hello';
    console.log('/res/render/static', data);

    res.renderAndStatic('./views/index.html', { data: data });
  });
};
