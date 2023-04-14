## qiao-get-ip

[![npm version](https://img.shields.io/npm/v/qiao-get-ip.svg?style=flat-square)](https://www.npmjs.org/package/qiao-get-ip)
[![npm downloads](https://img.shields.io/npm/dm/qiao-get-ip.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-get-ip)

Get public network ip under browser and node.js

> 浏览器和 node.js 下获取公网 ip

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

The public IP can be obtained through the `getIP` method

> 通过`getIP`方法可以获取公网 ip

```javascript
const ip = await getIP();
```

### options.timeout

The `timeout` attribute is used to set the timeout time,Unit: ms, default: 200ms

> `timeout`属性用来设置超时时间，单位是毫秒，默认 200ms

```javascript
const ip = await getIP({ timeout: 200 });
```

### options.info

If the `info` attribute is set, the information about obtaining the public IP will be printed

> 如果设置`info`属性，会打印获取公网 ip 的信息

```javascript
const ip = await getIP({
  timeout: 200,
  info: true,
});
```

If the `timeout` is set to 300ms and the `info` attribute is true, the effect is as follows

> 如果设置了`timeout`为 300ms，且`info`属性为 true，效果如下

```shell
get ip by sohu.com: 88.048ms
get ip by sohu.com: xxx.xxx.xxx.xxx

get ip by insistime.com: 122.362ms
get ip by insistime.com: xxx.xxx.xxx.xxx

get ip by icanhazip.com: 241.551ms
get ip by icanhazip.com: xxx.xxx.xxx.xxx

get ip by ipify.org: 305.327ms
get ip by ipify.org failed: timeout of 300ms exceeded

get ip by ipinfo.io: 304.342ms
get ip by ipinfo.io failed: timeout of 300ms exceeded

get ip by ifconfig.me: 303.981ms
get ip by ifconfig.me failed: timeout of 300ms exceeded

get ip by amazonaws.com: 303.691ms
get ip by amazonaws.com failed: timeout of 300ms exceeded
```

## fast

Request the following websites and return the fastest response. The default timeout is 200ms

> 请求以下几个网站，返回最快的响应，默认超时时间为 200ms

- [https://api.ipify.org/](https://api.ipify.org/)
- [https://icanhazip.com/](https://icanhazip.com/)
- [https://ipinfo.io/ip](https://ipinfo.io/ip)
- [https://ifconfig.me/ip](https://ifconfig.me/ip)
- [https://checkip.amazonaws.com/](https://checkip.amazonaws.com/)
- [http://txt.go.sohu.com/ip/soip](http://txt.go.sohu.com/ip/soip)
- [https://insistime.com/ip?type=api](https://insistime.com/ip?type=api)

## version

### 0.0.5.20230205

1. get ip by race

### 0.0.4.20221025

1. 1.0.0

### 0.0.3.20220512

1. ncu

### 0.0.2.20210215

1. add jsdoc
2. add jest

### 0.0.1.20200819

1. init project
2. http method
3. qiao-get-ip
4. get ip by sohu
5. get ip by icanhazip
6. get ip
