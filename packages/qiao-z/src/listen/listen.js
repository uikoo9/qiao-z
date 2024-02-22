// http
import http from 'http';

// listen request
import listenRequest from './listen-request.js';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
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
    debug(methodName, 'checkContinue');
  });
  server.on('checkExpectation', () => {
    debug(methodName, 'checkExpectation');
  });
  server.on('clientError', (err) => {
    debug(methodName, 'clientError', err);
  });
  server.on('close', () => {
    debug(methodName, 'close');
  });
  server.on('connect', () => {
    debug(methodName, 'connect');
  });
  server.on('dropRequest', () => {
    debug(methodName, 'dropRequest');
  });
  server.on('upgrade', () => {
    debug(methodName, 'upgrade');
  });

  // request
  server.on('request', (request, response) => {
    debug(methodName, 'request');
    listenRequest(request, response, routers, plugins);
  });

  // listen
  server.listen(port);
  debug(methodName, 'listen end');
};

export default listen;
