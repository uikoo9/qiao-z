## qiao-string

[![npm version](https://img.shields.io/npm/v/qiao-string.svg?style=flat-square)](https://www.npmjs.org/package/qiao-string)
[![npm downloads](https://img.shields.io/npm/dm/qiao-string.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-string)

nodejs 下[qiao-z](https://code.insistime.com/qiao-z#/)中的 string 相关工具类

## install

安装

```shell
npm i qiao-string
```

## use

使用

```javascript
// cjs
const { firstLetterUpper } = require('qiao-string');

// mjs
import { firstLetterUpper } from 'qiao-string';
```

## api

```javascript
// upper first letter
firstLetterUpper(str);

// lower first letter
firstLetterLower(str);

// under score case 2 camel case
underScoreCaseToCamelCase(str);
```

## version

## 0.0.6.20230207

1. 1.0.0

### 0.0.5.20220422

1. add lerna

### 0.0.4.20191204

1. add funding

### 0.0.3.20190107

1. npm audit

### 0.0.2.20181122

1. npm audit

### 0.0.1.20181107

1. init
