## qiao-get-ip

[![npm version](https://img.shields.io/npm/v/qiao-get-ip.svg?style=flat-square)](https://www.npmjs.org/package/qiao-get-ip)
[![npm downloads](https://img.shields.io/npm/dm/qiao-get-ip.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-get-ip)

浏览器和 node.js 下获取公网 ip

## install

```shell
npm i qiao-get-ip
```

## usage

```javascript
// commonjs
const { getIP } = require('qiao-get-ip');

// es6
import { getIP } from 'qiao-get-ip';
```

## api

### getIP

获取公网 ip

- timeout
  - 类型: number
  - 说明: 超时时间，单位 ms，默认为 300ms
- return
  - 类型: string
  - 说明: ip

```javascript
const ip = await getIP(timeout);
```

## fast

请求以下几个网站，返回最快的响应，默认超时时间为 300ms

- [https://api.ipify.org/](https://api.ipify.org/)
- [https://icanhazip.com/](https://icanhazip.com/)
- [https://ipinfo.io/ip](https://ipinfo.io/ip)
- [https://ifconfig.me/ip](https://ifconfig.me/ip)
- [https://checkip.amazonaws.com/](https://checkip.amazonaws.com/)
- [http://txt.go.sohu.com/ip/soip](http://txt.go.sohu.com/ip/soip)
