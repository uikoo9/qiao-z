/**
 * watchConnections
 * @param {*} app
 * @returns
 */
export const watchConnections = (app) => {
  const methodName = 'watchConnections';

  // check
  if (!app.config.connectionLimit || !app.config.watch) return;

  // pool
  const pool = app.pool;
  setInterval(() => {
    const poolState = pool._allConnections.length;
    const activeConnections = pool._activeConnections.length;
    const idleConnections = pool._idleConnections.length;
    const waitingConnections = pool._connectionQueue.length;

    // logs
    console.log(methodName, '总连接数', poolState);
    console.log(methodName, '活跃连接数', activeConnections);
    console.log(methodName, '空闲连接数', idleConnections);
    console.log(methodName, '等待队列长度', waitingConnections);
  }, 1000);
};
