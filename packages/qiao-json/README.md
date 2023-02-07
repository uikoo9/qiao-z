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

## version

### 0.0.7.202030207

1. 1.0.0

### 0.0.6.20220417

1. add lerna

### 0.0.5.20220407

1. md

### 0.0.4.20191204

1. add funding

### 0.0.3.20181127

1. add .js

### 0.0.2.20181122

1. npm audit

### 0.0.1.20181113

1. init
