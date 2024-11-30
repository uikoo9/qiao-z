// service
const service = require('../service/CosService.js');

/**
 * cos controller
 */
module.exports = (app) => {
  // /cos/token
  app.post('/cos/token', (req, res) => {
    service.cosToken(req, res);
  });

  // /cos/sign
  app.post('/cos/sign', (req, res) => {
    service.cosSign(req, res);
  });
};
