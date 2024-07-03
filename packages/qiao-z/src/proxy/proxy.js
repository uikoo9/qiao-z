// http
import http from 'http';
import httpProxy from 'http-proxy';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
const methodName = 'proxy';

/**
 * proxy
 * @param {*} options
 * @returns
 */
const proxy = (options) => {
  // proxy server
  const proxyServer = httpProxy.createProxyServer({});
  const server = http.createServer(function (req, res) {
    proxyServer.web(req, res, { target: options.proxyUrl });
  });

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

  // listen
  server.listen(options.port);
  debug(methodName, 'listen end');
};

export default proxy;
