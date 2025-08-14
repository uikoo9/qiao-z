## qiao-z-nuser

[![npm version](https://img.shields.io/npm/v/qiao-z-app.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-nuser)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-app.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-nuser)

[qiao-z](https://qiao-z.vincentqiao.com/#/) new user module

## 安装

```shell
npm i qiao-z qiao-z-nuser
```

## 使用示例

qiao-z中使用qiao-z-nuser

```javascript
// app
const nuser = require('qiao-z-nuser');

// options
const options = {
  // app
  config: config,
  modules: [nuser.init],
};

// app
const app = require('qiao-z')(options);

// listen
app.listen(port);
```

## 内置路由

- `/user/login`: 用户登录
- `/user/check`: 用户检查
