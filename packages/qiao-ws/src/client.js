// ws
import { WebSocket } from 'ws';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-ws');

/**
 * initWSClient
 * @param {*} options
 * @returns
 */
export const initWSClient = (options) => {
  const methodName = 'initWSClient';

  // check
  if (!options || !options.url) {
    logger.error(methodName, 'need options.url');
    return;
  }

  // clientWS
  const clientWS = new WebSocket(options.url, options.clientOptions || {});

  // onWSClose
  clientWS.on('close', (code, reason) => {
    logger.info(methodName, `ws close ${code} ${reason}`);
    if (options.onWSClose) options.onWSClose(code, reason);
  });

  // onWSError, https://github.com/websockets/ws/blob/master/doc/ws.md#error-codes
  clientWS.on('error', (error) => {
    logger.info(
      methodName,
      `ws error ${error && error.code}, https://github.com/websockets/ws/blob/master/doc/ws.md#error-codes`,
    );
    if (options.onWSError) options.onWSError(error);
  });

  // onWSMessage
  clientWS.on('message', (data, isBinary) => {
    logger.info(methodName, 'ws message');
    if (options.onWSMessage) options.onWSMessage(data, isBinary);
  });

  // onWSOpen
  clientWS.on('open', () => {
    logger.info(methodName, 'ws open');
    if (options.onWSOpen) options.onWSOpen();
  });

  // onWSPing
  clientWS.on('ping', (data) => {
    logger.info(methodName, 'ws ping');
    if (options.onWSPing) options.onWSPing(data);
  });

  // onWSPong
  clientWS.on('pong', (data) => {
    logger.info(methodName, 'ws pong');
    if (options.onWSPong) options.onWSPong(data);
  });

  // onWSRedirect
  clientWS.on('redirect', (url, request) => {
    logger.info(methodName, 'ws redirect');
    if (options.onWSRedirect) options.onWSRedirect(url, request);
  });

  // onWSUnexpectedResponse
  clientWS.on('unexpected-response', (request, response) => {
    logger.info(methodName, 'ws unexpected-response');
    if (options.onWSUnexpectedResponse) options.onWSUnexpectedResponse(request, response);
  });

  // onWSUpgrade
  clientWS.on('upgrade', (response) => {
    logger.info(methodName, 'ws upgrade');
    if (options.onWSUpgrade) options.onWSUpgrade(response);
  });

  // go
  return clientWS;
};
