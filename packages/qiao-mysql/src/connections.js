/**
 * watchConnections
 * @param {*} app
 * @returns
 */
export const watchConnections = (app) => {
  // check
  if (!app.config.connectionLimit || !app.config.watch || !app.config.watchCallback) return;

  // const
  const intervalTime = app.config.watchInterval || 1000;
  const watchCallback = app.config.watchCallback;

  // pool
  const pool = app.pool;
  setInterval(() => {
    const totalConnections = pool._allConnections.length;
    const idleConnections = pool._freeConnections?.length || 0;
    const activeConnections = totalConnections - idleConnections;
    const waitingConnections = pool._connectionQueue?.length || 0;

    // callback
    watchCallback({
      totalConnections,
      idleConnections,
      activeConnections,
      waitingConnections,
    });
  }, intervalTime);
};
