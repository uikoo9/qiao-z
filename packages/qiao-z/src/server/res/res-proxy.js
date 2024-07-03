// proxy
import httpProxy from 'http-proxy';

// Logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-z');

// const
const proxyServer = httpProxy.createProxyServer({});

/**
 * res.proxy
 * @param {*} request
 * @param {*} response
 * @param {*} proxyOptions
 */
const proxy = (request, response, proxyOptions) => {
  proxyServer.web(request, response, { target: proxyOptions.proxyUrl }, (e) => {
    logger.error('res.proxy', e);
  });
};

export default proxy;
