const service = require('../service/UcenterUserService.js');

/**
 * ucenter user controller
 */
module.exports = (app) => {
    // ucenter user reg
    app.post('/ucenter/user/reg', (req, res) => {
        service.ucenterUserReg(req, res);
    });

    // ucenter user login
    app.post('/ucenter/user/login', (req, res) => {
        service.ucenterUserLogin(req, res);
    });

    // ucenter user forget
    app.post('/ucenter/user/forget', (req, res) => {
        service.ucenterUserForget(req, res);
    });

    // ucenter code send
    app.post('/ucenter/code/send', (req, res) => {
        service.ucenterCodeSend(req, res);
    });

    // ucenter user get
    app.post('/ucenter/user/get', (req, res) => {
        service.ucenterUserGet(req, res);
    });

    // ucenter user check
    app.post('/ucenter/user/check', (req, res) => {
        service.ucenterUserCheck(req, res);
    });

    // ucenter user menus
    app.post('/ucenter/user/menus', (req, res) => {
        service.ucenterUserMenus(req, res);
    });
};