## qiao-short-link

[![npm version](https://img.shields.io/npm/v/qiao-short-link.svg?style=flat-square)](https://www.npmjs.org/package/qiao-short-link)
[![npm downloads](https://img.shields.io/npm/dm/qiao-short-link.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-short-link)

Generate short links under browser and node.js

> 浏览器和 nodejs 下生成短链接

## install

```shell
npm i qiao-short-link
```

## usage

```javascript
// commonjs
const { shortLink } = require('qiao-short-link');

// es6
import { shortLink } from 'qiao-short-link';
```

## api

### shortLink

Short links can be generated through the `shortLink` method

> 通过`shortLink`方法可以生成短链接

```javascript
const shortLink = await shortLink(longLink);
```

### options.timeout

The `timeout` attribute is used to set the timeout time,Unit: ms, default: 200ms

> `timeout`属性用来设置超时时间，单位是毫秒，默认 200ms

```javascript
const slink = await shortLink(longLink, { timeout: 200 });
```

### options.info

If the `info` attribute is set, the information about obtaining the short link will be printed

> 如果设置了`info`属性，会打印获取短链接的信息

```javascript
const slink = await shortLink(longLink, { timeout: 200, info: true });
```

If the `timeout` is set to 300ms and the `info` attribute is true, the effect is as follows

> 如果设置了`timeout`为 300ms，且`info`属性为 true，效果如下

```shell
short link by tiyee.cn: 57.561ms
short link by tiyee.cn success: https://tiyee.cn/iszc

short link by gotiny.cc: 304.041ms
short link by gotiny.cc failed: timeout of 300ms exceeded
```

## fast

Request the following websites and return the fastest response. The default timeout is 200ms

> 请求以下几个网站，返回最快的响应，默认超时时间为 200ms

- [tiyee.cn](tiyee.cn)
- [gotiny.cc](gotiny.cc)

## version

## 0.0.3.20230210

1. short link race

## 0.0.2.20230201

1. 1.0.0

### 0.0.1.20200911

1. init project
2. short url
3. qiao-short-link
