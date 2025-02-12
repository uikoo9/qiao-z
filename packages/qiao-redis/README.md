## qiao-redis

[![npm version](https://img.shields.io/npm/v/qiao-redis.svg?style=flat-square)](https://www.npmjs.org/package/qiao-redis)
[![npm downloads](https://img.shields.io/npm/dm/qiao-redis.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-redis)

nodejs 下 redis 能力

## usage

```javascript
// commonjs
const qRedis = require('qiao-redis');

// es6
import qRedis from 'qiao-redis';
```

## api

```javascript
// client
const redis = qRedis(options);

// set
await redis.set(key, value);

// get
await redis.get(key);

// del
await redis.del(key);
```
