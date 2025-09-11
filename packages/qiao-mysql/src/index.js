// util
import { lib, getConnection, getPool, query, getColumns, getTypes } from './util.js';

// connections
import { watchConnections } from './connections.js';

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

export default init;
