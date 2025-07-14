## qiao-rate-limit

[![npm version](https://img.shields.io/npm/v/qiao-rate-limit.svg?style=flat-square)](https://www.npmjs.org/package/qiao-rate-limit)
[![npm downloads](https://img.shields.io/npm/dm/qiao-rate-limit.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-rate-limit)

nodejs 下限制服务器请求频次封装

## usage

```javascript
// commonjs
const { rateLimit } = require('qiao-rate-limit');

// es6
import { rateLimit } from 'qiao-rate-limit';
```

## api

### 初始化

```javascript
global.rateLimitItems = [];
```

### rateLimit

限制频次的中间件

```javascript
// true代表频次被限制
const rateLimitRes = rateLimit(ip, maxCount);
console.log(rateLimitRes);
```

### clearIntervalRateLimit

定时检测过期的key

```javascript
clearIntervalRateLimit(duration);
```
