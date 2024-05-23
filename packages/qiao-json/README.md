## qiao-json

[![npm version](https://img.shields.io/npm/v/qiao-json.svg?style=flat-square)](https://www.npmjs.org/package/qiao-json)
[![npm downloads](https://img.shields.io/npm/dm/qiao-json.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-json)

nodejs 下 [qiao-z](https://qiao-z.vincentqiao.com/#/) 中的 json 数据结构

## usage

```javascript
// commonjs
const { success, fail } = require('qiao-json');

// es6
import { success, fail } from 'qiao-json';
```

## api

```javascript
const json = success('msg', {});
console.log(json);

// success
{ type: 'success', msg: 'msg', obj: {} }

// fail
{ type: 'fail', msg: 'msg', obj: {} }
```
