## qiao-z-cos

[![npm version](https://img.shields.io/npm/v/qiao-z-cos.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-cos)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-cos.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-cos)

[qiao-z](https://qiao-z.vincentqiao.com/#/) cos module

## 安装

```shell
npm i qiao-z qiao-z-cos
```

## 使用示例

qiao-z中使用qiao-z-cos的示例

```javascript
// cos
const cos = require('qiao-z-cos');

// options
const options = {
  // cos
  config: config,
  modules: [cos.init],
};

// app
const app = require('qiao-z')(options);

// listen
app.listen(port);
```

## 内置路由

- `/cos/token`: 获取cos token
- `/cos/sing`: 获取cos sign
