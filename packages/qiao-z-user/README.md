## qiao-z-user

[![npm version](https://img.shields.io/npm/v/qiao-z-user.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-user)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-user.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-user)

[qiao-z](https://code.insistime.com/qiao-z#/) user module

## 安装

```shell
npm i qiao-z qiao-z-user
```

## 使用示例

qiao-z中使用qiao-z-user的示例

```javascript
// user
const user = require('qiao-z-user');

// options
const options = {
  // users
  checks: [user.checkAuth],
  modules: [user.init],
};

// app
const app = require('qiao-z')(options);

// listen
app.listen(port);
```

## 内置路由

### user相关路由

- `/user/reg`: 用户注册
- `/user/login`: 用户登录
- `/user/forget`: 忘记密码
- `/user/check`: 用户检测
- `/user/menus`: 用户菜单
- `/code/send`: 发送验证码
