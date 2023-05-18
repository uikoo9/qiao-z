## qiao-cache

[![npm version](https://img.shields.io/npm/v/qiao-cache.svg?style=flat-square)](https://www.npmjs.org/package/qiao-cache)
[![npm downloads](https://img.shields.io/npm/dm/qiao-cache.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-cache)

nodejs 下 cache 能力

## usage

```javascript
// commonjs
const { cache } = require('qiao-cache');

// es6
import { cache } from 'qiao-cache';
```

## api

### cache

```javascript
// set
cache('test', 'hello');

// get
const s = cache('test');
console.log(s); // hello

// del
cache('test', null);
console.log(q.cache('test')); // undefined
```
