## qiao-short-link

[![npm version](https://img.shields.io/npm/v/qiao-short-link.svg?style=flat-square)](https://www.npmjs.org/package/qiao-short-link)
[![npm downloads](https://img.shields.io/npm/dm/qiao-short-link.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-short-link)

浏览器和 nodejs 下生成短链接

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

生成短链接

- longLink
  - 类型: string
  - 说明: 长链接
- timeout
  - 类型: number
  - 说明: 超时时间，单位 ms，默认为 300ms
- return
  - 类型: string
  - 说明: 短链接

```javascript
const shortLink = await shortLink(longLink, timeout);
```

## fast

请求以下几个网站，返回最快的响应，默认超时时间为 300ms

- [tiyee.cn](tiyee.cn)
- [gotiny.cc](gotiny.cc)
