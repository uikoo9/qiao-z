# qiao-z

[![npm version](https://img.shields.io/npm/v/qiao-z.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z)

nodejs 下极简的 web 框架，详见：[一篇文章开发 Node.js-Web-Server](https://blog.insistime.com/nodejs-web-server)

## 官网

[https://qiao-z.insistime.com/#/](https://qiao-z.insistime.com/#/)

## 安装

```shell
npm i qiao-z
```

## 使用

```javascript
/**
 * |-- app.js
 */

// qz
const qz = require('qiao-z');

// app
const app = qz();

// listen
app.listen();
```

## examples

```shell
git clone ...
cd __tests__
node app.js

# open http://localhost:5277
```
