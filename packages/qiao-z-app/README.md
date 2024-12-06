## qiao-z-app

[![npm version](https://img.shields.io/npm/v/qiao-z-app.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-app)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-app.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-app)

[qiao-z](https://qiao-z.vincentqiao.com/#/) app module

## 安装

```shell
npm i qiao-z qiao-z-app
```

## 使用示例

qiao-z中使用qiao-z-app的示例

```javascript
// app
const app = require('qiao-z-app');

// options
const options = {
  // app
  config: config,
  modules: [app.init],
};

// app
const app = require('qiao-z')(options);

// listen
app.listen(port);
```

## 内置路由

- `/app`: 发送短信
