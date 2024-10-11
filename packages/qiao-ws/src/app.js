// server
import { initWSServer } from './server.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ws');

/**
 * app
 */
export default async () => {
  const methodName = 'constructor';

  // app
  const app = {};

  // server
  app.server = (options) => {
    logger.info(methodName, 'server options', options);
    return initWSServer(options);
  };

  //
  return app;
};
