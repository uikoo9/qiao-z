## qiao-alipay

[![npm version](https://img.shields.io/npm/v/qiao-alipay.svg?style=flat-square)](https://www.npmjs.org/package/qiao-alipay)
[![npm downloads](https://img.shields.io/npm/dm/qiao-alipay.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-alipay)

nodejs 下支付宝支付能力

## install

安装

```shell
npm i qiao-alipay
```

## config

配置文件

```json
{
  "appId": "",
  "privateKey": "",
  "alipayPublicKey": ""
}
```

## alipay

```javascript
// config
const config = require('./config.json');

// alipay
const alipay = require('qiao-alipay')(config);
```

## api

### check

检查配置是否正确

- return
  - 类型: boolean
  - 说明: 返回是否成功

```javascript
await alipay.check();
```

### pay

支付

- options.tradeTitle
  - 类型: string
  - 说明: 支付标题
- options.tradeOrder
  - 类型: string
  - 说明: 支付订单号
- options.tradeAmount
  - 类型: string
  - 说明: 支付金额
- options.payMode
  - 类型: string
  - 说明: 支付方式，主要是二维码显示方式，https://opendocs.alipay.com/open-v3/2423fad5_alipay.trade.page.pay
- options.qrcodeWidth
  - 类型: number
  - 说明: 二维码宽度
- options.notifyUrl
  - 类型: string
  - 说明: 支付回调url
- options.returnUrl
  - 类型: string
  - 说明: 回调url
- return
  - 类型: string
  - 说明: 返回支付页面

```javascript
await alipay.pay(options);
```

### query

查询支付结果

- tradeOrder
  - 类型: string
  - 说明: 支付订单号
- return
  - 类型: object
  - 说明: 返回查询结果

```javascript
await alipay.query(tradeOrder);
```

### checkSign

校验返回的签名是否正确

- queryObj
  - 类型: object
  - 说明: 支付宝返回的queryObj
- return
  - 类型: boolean
  - 说明: 返回是否成功

```javascript
alipay.checkSign(queryObj);
```
