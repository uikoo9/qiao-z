/**
 * watchConnections
 * @param {*} app
 * @returns
 */
export const watchConnections = (app) => {
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
