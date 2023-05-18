## qiao-json

[![npm version](https://img.shields.io/npm/v/qiao-json.svg?style=flat-square)](https://www.npmjs.org/package/qiao-json)
[![npm downloads](https://img.shields.io/npm/dm/qiao-json.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-json)

nodejs 下 [qiao-z](https://code.insistime.com/qiao-z#/) 中的 json 数据结构

## usage

```javascript
// commonjs
const { success, info, warning, danger } = require('qiao-json');

// es6
import { success, info, warning, danger } from 'qiao-json';
```

## api

```javascript
const { success, info, warning, danger } = require('qiao-json');

const json = success('test', {});
console.log(json);
```
