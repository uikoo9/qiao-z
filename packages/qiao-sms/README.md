## qiao-sms

[![npm version](https://img.shields.io/npm/v/qiao-sms.svg?style=flat-square)](https://www.npmjs.org/package/qiao-sms)
[![npm downloads](https://img.shields.io/npm/dm/qiao-sms.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-sms)

nodejs下[submail](https://www.mysubmail.com/)发送短信封装

## install

安装

```shell
npm i qiao-sms
```

## use

使用

```javascript
// cjs
const { submailSMS } = require('qiao-sms');

// mjs
import { submailSMS } from 'qiao-sms';
```

## api

### submailSMS

发送短信

- options
  - 类型: object
  - 说明: 发送短信参数
- options.appid
  - 类型: string
  - 说明: appid
- options.appkey
  - 类型: string
  - 说明: appkey
- options.mobile
  - 类型: string
  - 说明: 手机号
- options.content
  - 类型: string
  - 说明: 短信内容
- return
  - 类型: object
  - 说明: 返回信息

```javascript
await submailSMS({
  appid: appId,
  appkey: appKey,
  mobile: mobile,
  content: content,
});
```
