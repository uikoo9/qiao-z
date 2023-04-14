## qiao-ua

[![npm version](https://img.shields.io/npm/v/qiao-ua.svg?style=flat-square)](https://www.npmjs.org/package/qiao-ua)
[![npm downloads](https://img.shields.io/npm/dm/qiao-ua.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-ua)

解析 user-agent，返回浏览器，平台，操作系统等信息，fork 自[bowser](https://www.npmjs.com/package/bowser)（由于 2 年没有维护），并做了一些改动

## install

安装

```shell
npm i qiao-ua
```

## use

使用

```javascript
// cjs
const ua = require('qiao-ua');

// mjs
import ua from 'qiao-ua';
```

## ua

ua

- useragent
  - 类型: string
  - 说明: useragent
- return
  - 类型: object
  - 说明: 结果
  - ```javascript
    {
      browser: { name: 'Chrome', version: '106.0.0.0' },
      os: { name: 'macOS', version: '10.15.7', versionName: 'Catalina' },
      platform: { type: 'desktop', vendor: 'Apple' },
      engine: { name: 'Blink' },
      isMobile: false
    }
    ```

```javascript
const res = ua(useragent);
```

## version

### 0.0.2.20221107

1. qiao-z --> qiao-ua

### 0.0.1.20221028

1. init project
