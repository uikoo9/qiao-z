// server
import { initWSServer } from './server.js';

// client
import { initWSClient } from './client.js';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ws');

/**
 * app
 */
export default () => {
  const methodName = 'constructor';

  // app
  const app = {};

  // server
  app.server = (options) => {
    logger.info(methodName, 'server options', options);
    return initWSServer(options);
  };

  // client
  app.client = (options) => {
    logger.info(methodName, 'client options', options);
    return initWSClient(options);
  };

  //
  return app;
};
