## qiao-z-ua
[![npm version](https://img.shields.io/npm/v/qiao-z-ua.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-ua)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-ua.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-ua)

[qiao-z](https://www.npmjs.com/package/qiao-z) useragent module

## 说明

解析user-agent，返回浏览器，平台，操作系统等信息，fork自[bowser](https://www.npmjs.com/package/bowser)（由于2年没有维护），并做了一些改动

## install
```bash
npm i qiao-z-ua
```

## use
```javascript
// ua
var ua = require('qiao-z-ua');

var useragent = 'xxx';
var res = ua(useragent);
console.log(res);
```

return
```javascript
{
  browser: { name: 'Chrome', version: '106.0.0.0' },
  os: { name: 'macOS', version: '10.15.7', versionName: 'Catalina' },
  platform: { type: 'desktop', vendor: 'Apple' },
  engine: { name: 'Blink' },
  isMobile: false
}
```

## version
### 0.0.2.20221107
1. qiao-z --> qiao-z-ua
   
### 0.0.1.20221028
1. init project