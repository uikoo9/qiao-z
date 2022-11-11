// service
const service = require('../service/UcenterMenuService.js');

/**
 * ucenter menu controller
 */
module.exports = (app) => {
    // ucenter menu list
    app.post('/ucenter/menu/list', (req, res) => {
        service.ucenterMenuList(req, res);
    });

    // ucenter menu get
    app.post('/ucenter/menu/get', (req, res) => {
        service.ucenterMenuGet(req, res);
    });

    // ucenter menu save
    app.post('/ucenter/menu/save', (req, res) => {
        service.ucenterMenuSave(req, res);
    });

    // ucenter menu del
    app.post('/ucenter/menu/del', (req, res) => {
        service.ucenterMenuDel(req, res);
    });
};