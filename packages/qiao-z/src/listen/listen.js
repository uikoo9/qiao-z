// http
import http from 'http';

// listen request
import listenRequest from './listen-request.js';

// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');
const methodName = 'listen';

/**
 * listen
 * @param {*} port
 * @param {*} routers
 * @param {*} plugins
 * @returns
 */
const listen = (port, routers, plugins) => {
  if (!routers) return;

  // server
  const server = http.createServer();

  // on
  server.on('checkContinue', () => {
    logger.info(methodName, 'checkContinue');
  });
  server.on('checkExpectation', () => {
    logger.info(methodName, 'checkExpectation');
  });
  server.on('clientError', (err) => {
    logger.info(methodName, 'clientError', err);
  });
  server.on('close', () => {
    logger.info(methodName, 'close');
  });
  server.on('connect', () => {
    logger.info(methodName, 'connect');
  });
  server.on('dropRequest', () => {
    logger.info(methodName, 'dropRequest');
  });
  server.on('upgrade', () => {
    logger.info(methodName, 'upgrade');
  });

  // request
  server.on('request', (request, response) => {
    logger.info(methodName, 'request');
    listenRequest(request, response, routers, plugins);
  });

  // listen
  server.listen(port);
  logger.info(methodName, 'listen end');
};

export default listen;
