## qiao-z-sms

[![npm version](https://img.shields.io/npm/v/qiao-z-sms.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-sms)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-sms.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-sms)

[qiao-z](https://qiao-z.vincentqiao.com/#/) sms module

## 安装

```shell
npm i qiao-z qiao-z-sms
```

## 使用示例

qiao-z中使用qiao-z-sms的示例

```javascript
// sms
const sms = require('qiao-z-sms');

// options
const options = {
  // sms
  modules: [sms.init],
};

// app
const app = require('qiao-z')(options);

// listen
app.listen(port);
```

## 内置路由

### user相关路由

- `/sms/reg`: 用户注册
- `/sms/login`: 用户登录
- `/sms/forget`: 忘记密码
- `/sms/menus`: 用户菜单
- `/code/send`: 发送验证码
