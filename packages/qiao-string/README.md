## qiao-string

[![npm version](https://img.shields.io/npm/v/qiao-string.svg?style=flat-square)](https://www.npmjs.org/package/qiao-string)
[![npm downloads](https://img.shields.io/npm/dm/qiao-string.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-string)

nodejs 下[qiao-z](https://qiao-z.vincentqiao.com/#/)中的 string 相关工具类

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
