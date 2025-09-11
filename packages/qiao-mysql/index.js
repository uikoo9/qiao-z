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
      connection.end(() => {
        return error ? reject(error) : resolve(results);
      });
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

/**
 * watchConnections
 * @param {*} app
 * @returns
 */
const watchConnections = (app) => {
  const methodName = 'watchConnections';

  // check
  if (!app.config.connectionLimit || !app.config.watch) return;

  // const
  const intervalTime = app.config.watchInterval || 1000;

  // pool
  const pool = app.pool;
  setInterval(() => {
    const totalConnections = pool._allConnections.length;
    const idleConnections = pool._freeConnections?.length || 0;
    const activeConnections = totalConnections - idleConnections;
    const waitingConnections = pool._connectionQueue?.length || 0;

    // logs
    console.log(methodName, 'time', new Date().getTime());
    console.log(methodName, 'totalConnections', totalConnections);
    console.log(methodName, 'idleConnections', idleConnections);
    console.log(methodName, 'activeConnections', activeConnections);
    console.log(methodName, 'waitingConnections', waitingConnections);
    console.log();
  }, intervalTime);
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

  // watch
  watchConnections(app);

  // return
  return app;
};

module.exports = init;
