// mysql
var mysql = require('qiao-mysql');

/**
 * ucenter role-r-menu sql
 */
exports.sql = require('./ucenter-role-r-menu-sql.json');

/**
 * ucenter role-r-menu get by id
 */
exports.ucenterRoleRMenuGetById = function(id){
	var params = [];
	params.push(id);

	return mysql.query(global.QIAO_USER_CONFIG.db, exports.sql.ucenterRoleRMenuGetById, params);
};

/**
 * ucenter role-r-menu add
 */
exports.ucenterRoleRMenuAdd = function(params){
	return mysql.query(global.QIAO_USER_CONFIG.db, exports.sql.ucenterRoleRMenuAdd, params);
};

/**
 * ucenter role-r-menu edit
 */
exports.ucenterRoleRMenuEdit = function(params){
	return mysql.query(global.QIAO_USER_CONFIG.db, exports.sql.ucenterRoleRMenuEdit, params);
};

/**
 * ucenter role-r-menu del
 */
exports.ucenterRoleRMenuDel = function(ids){
	var params = [];
	params.push(ids);
	
	return mysql.query(global.QIAO_USER_CONFIG.db, exports.sql.ucenterRoleRMenuDel, params);
};