'use strict';

var mysql = require('mysql');

// mysql

/**
 * lib
 */
const lib = mysql;

/**
 * get connection
 * @param {*} app
 * @returns
 */
const getConnection = (app) => {
  // check
  if (!app || !app.config) return;

  // config
  const config = app.config;
  if (config.connectionLimit) return;

  // connection
  return mysql.createConnection(config);
};

/**
 * get pool
 * @param {*} app
 * @returns
 */
const getPool = (app) => {
  // check
  if (!app || !app.config) return;

  // config
  const config = app.config;
  if (!config.connectionLimit) return;

  // pool
  return mysql.createPool(config);
};

/**
 * query
 * @param {*} app
 * @param {*} sql
 * @param {*} params
 * @returns
 */
const query = async (app, sql, params) => {
  // check
  if (!app) return;

  // query by connection
  if (app.connection) {
    return await queryByConnection(app.connection, sql, params);
  }

  // query by pool
  if (app.pool) {
    return await queryByPool(app.pool, sql, params);
  }

  // return
  return;
};

// query by connection
function queryByConnection(connection, sql, params) {
  // connect
  connection.connect();

  // query
  return new Promise((resolve, reject) => {
    connection.query(sql, params || [], (error, results) => {
      connection.end();

      return error ? reject(error) : resolve(results);
    });
  });
}

// query by pool
function queryByPool(pool, sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params || [], (error, results) => {
      return error ? reject(error) : resolve(results);
    });
  });
}

/**
 * get columns
 * @param {*} app
 * @param {*} tableName
 * @returns
 */
const getColumns = async (app, tableName) => {
  return await query(app, 'SHOW COLUMNS FROM ?', mysql.raw(tableName));
};

/**
 * get types
 * @param {*} mysqlType
 * @returns
 */
const getTypes = (mysqlType) => {
  // check
  if (!mysqlType) return 'string';

  // char, varchar
  if (mysqlType.indexOf('char') > -1) return 'string';

  // int
  if (mysqlType.indexOf('int') > -1) return 'number';

  // date, datetime
  if (mysqlType.indexOf('date') > -1) return 'date';

  return 'string';
};

// util

/**
 * init
 * @param {*} config
 * @returns
 */
const init = (config) => {
  // check
  if (!config) return;

  // app
  const app = {};
  app.config = config;
  app.mysql = lib;
  app.connection = getConnection(app);
  app.pool = getPool(app);
  app.query = async (sql, params) => {
    return await query(app, sql, params);
  };
  app.getColumns = async (tableName) => {
    return await getColumns(app, tableName);
  };
  app.getTypes = getTypes;

  // return
  return app;
};

module.exports = init;
