## qiao-string

[![npm version](https://img.shields.io/npm/v/qiao-string.svg?style=flat-square)](https://www.npmjs.org/package/qiao-string)
[![npm downloads](https://img.shields.io/npm/dm/qiao-string.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-string)

nodejs 下[qiao-z](https://code.insistime.com/qiao-z#/)中的 string 相关工具类

## api

### firstLetterUpper

```javascript
const { firstLetterUpper } = require('qiao-string');

const test = function () {
  const str = 'table';
  const s = firstLetterUpper(str);

  console.log(s);
};

test();
```

### firstLetterLower

```javascript
const { firstLetterLower } = require('qiao-string');

const test = function () {
  const str = 'Table';
  const s = firstLetterLower(str);

  console.log(s);
};

test();
```

### underScoreCaseToCamelCase

```javascript
const { underScoreCaseToCamelCase } = require('qiao-string');

const test = function () {
  const str = 'share_type';
  const s = underScoreCaseToCamelCase(str);

  console.log(s);
};

test();
```

## version

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
