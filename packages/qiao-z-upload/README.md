# qiao-z-upload

[![npm version](https://img.shields.io/npm/v/qiao-z-upload.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-upload)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-upload.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-upload)

[qiao-z](https://qiao-z.insistime.com/#/) upload module

## api

```javascript
// config
const config = require('./server/config.json');

// qz
const qz = require('qiao-z');

// options
const options = {
  // upload，处理文件上传请求，会将文件信息返回到req.body
  upload: require('qiao-z-upload'),
};

// app
const app = qz(options);

// listen
app.listen(config.port);
```
