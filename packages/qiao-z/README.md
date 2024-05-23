# qiao-z

[![npm version](https://img.shields.io/npm/v/qiao-z.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z)

Node.js极简&高性能Web框架，详见：[一篇文章开发 Node.js-Web-Server](https://blog.insistime.com/nodejs-web-server)

## 官网

[https://qiao-z.vincentqiao.com/#/](https://qiao-z.vincentqiao.com/#/)

## 特性

- 使用简单，快速上手
- 强大的html模版渲染功能
- 丰富的常用功能插件
- express.js的3-4倍性能

## 性能

[性能测试](https://qiao-z.vincentqiao.com/docs/guides/performance.md)

![express-vs-qz](https://qiao-z.vincentqiao.com/docs/guides/imgs/express-vs-qz.png)

## api

- app
  - app.listen
  - app.static
  - app.get
  - app.post
- req
  - req.url
  - req.headers
  - req.cookies
  - req.useragent
  - req.query
  - req.params
  - req.body
  - req.ip
- res
  - res.redirect
  - res.send
  - res.json
  - res.jsonSuccess
  - res.jsonFail
  - res.setCookie
  - res.clearCookie
  - res.render
  - res.staticRender
