## qiao-review

[![npm version](https://img.shields.io/npm/v/qiao-review.svg?style=flat-square)](https://www.npmjs.org/package/qiao-review)
[![npm downloads](https://img.shields.io/npm/dm/qiao-review.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-review)

nodejs下内容审核工具

## install

安装

```shell
npm i qiao-review
```

## use

使用

```javascript
// cjs
const { reviewByShumei } = require('qiao-review');

// mjs
import { reviewByShumei } from 'qiao-review';
```

## api

### reviewByShumei

使用数美科技的服务做内容审核

- options
  - 类型: object
  - 说明: 内容审核参数
- options.url
  - 类型: string
  - 说明: 审核url
- options.appId
  - 类型: string
  - 说明: appId
- options.accessKey
  - 类型: string
  - 说明: accessKey
- options.eventId
  - 类型: string
  - 说明: eventId
- options.type
  - 类型: string
  - 说明: type
- options.text
  - 类型: string
  - 说明: text
- options.img
  - 类型: string
  - 说明: img
- options.tokenId
  - 类型: string
  - 说明: tokenId
- return
  - 类型: object
  - 说明: 返回信息
