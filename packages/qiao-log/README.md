## qiao-log

[![npm version](https://img.shields.io/npm/v/qiao-log.svg?style=flat-square)](https://www.npmjs.org/package/qiao-log)
[![npm downloads](https://img.shields.io/npm/dm/qiao-log.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-log)

nodejs 下日志能力

## logger

```javascript
const Logger = require('qiao-log');
const logger = Logger(options);
```

## options

[log4js](https://log4js-node.github.io/log4js-node/index.html)的配置

```javascript
const options = {
  appenders: {
    out: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['out'], level: 'debug' },
  },
};
```

## 使用 log4js 写日志

```javascript
logger.debug;
logger.info;
logger.warn;
logger.error;
```
