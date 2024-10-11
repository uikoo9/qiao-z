'use strict';

var ws = require('ws');
var qiao_log_js = require('qiao.log.js');

// ws
const logger$1 = qiao_log_js.Logger('qiao-ws');

/**
 * initWSServer
 * @param {*} options
 * @returns
 */
const initWSServer = (options) => {
  const methodName = 'initWSServer';

  // check
  if (!options || !options.port) {
    logger$1.error(methodName, 'need options.port');
    return;
  }

  // wss
  const wss = new ws.WebSocketServer(options);
  wss.on('connection', (serverWS, serverRequest) => {
    // onWSSConnection
    logger$1.info(methodName, 'wss connection');
    if (options.onWSSConnection) options.onWSSConnection(serverWS, serverRequest);

    // onWSClose
    serverWS.on('close', (code, reason) => {
      logger$1.info(methodName, `ws close ${code} ${reason}`);
      if (options.onWSClose) options.onWSClose(code, reason);
    });

    // onWSError, https://github.com/websockets/ws/blob/master/doc/ws.md#error-codes
    serverWS.on('error', (error) => {
      logger$1.info(
        methodName,
        `ws error ${error && error.code}, https://github.com/websockets/ws/blob/master/doc/ws.md#error-codes`,
      );
      if (options.onWSError) options.onWSError(error);
    });

    // onWSMessage
    serverWS.on('message', (data, isBinary) => {
      logger$1.info(methodName, 'ws message');
      if (options.onWSMessage) options.onWSMessage(data, isBinary);
    });

    // onWSOpen
    serverWS.on('open', () => {
      logger$1.info(methodName, 'ws open');
      if (options.onWSOpen) options.onWSOpen();
    });

    // onWSPing
    serverWS.on('ping', (data) => {
      logger$1.info(methodName, 'ws ping');
      if (options.onWSPing) options.onWSPing(data);
    });

    // onWSPong
    serverWS.on('pong', (data) => {
      logger$1.info(methodName, 'ws pong');
      if (options.onWSPong) options.onWSPong(data);
    });

    // onWSRedirect
    serverWS.on('redirect', (url, request) => {
      logger$1.info(methodName, 'ws redirect');
      if (options.onWSRedirect) options.onWSRedirect(url, request);
    });

    // onWSUnexpectedResponse
    serverWS.on('unexpected-response', (request, response) => {
      logger$1.info(methodName, 'ws unexpected-response');
      if (options.onWSUnexpectedResponse) options.onWSUnexpectedResponse(request, response);
    });

    // onWSUpgrade
    serverWS.on('upgrade', (response) => {
      logger$1.info(methodName, 'ws upgrade');
      if (options.onWSUpgrade) options.onWSUpgrade(response);
    });
  });

  // onWSSClose
  wss.on('close', () => {
    logger$1.info(methodName, 'wss close');
    if (options.onWSSClose) options.onWSSClose();
  });
  // onWSSError
  wss.on('error', (error) => {
    logger$1.info(methodName, 'wss error');
    if (options.onWSSError) options.onWSSError(error);
  });
  // onWSSHeaders
  wss.on('headers', (headers, request) => {
    logger$1.info(methodName, 'wss headers');
    if (options.onWSSHeaders) options.onWSSHeaders(headers, request);
  });
  // onWSSListening
  wss.on('listening', () => {
    logger$1.info(methodName, 'wss listening');
    if (options.onWSSListening) options.onWSSListening();
  });
  // onWSSClientError
  wss.on('wsClientError', (error, socket, request) => {
    logger$1.info(methodName, 'wss wsClientError');
    if (options.onWSSClientError) options.onWSSClientError(error, socket, request);
  });

  // go
  logger$1.info(
    methodName,
    `WebSocket server running on ws://${options.host || 'localhost'}:${options.port}, wss methods: https://github.com/websockets/ws/blob/master/doc/ws.md#serveraddress`,
  );
  return wss;
};

// server
const logger = qiao_log_js.Logger('qiao-ws');

/**
 * app
 */
var app = async () => {
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

module.exports = app;
