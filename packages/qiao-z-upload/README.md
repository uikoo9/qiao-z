# qiao-z-upload

[![npm version](https://img.shields.io/npm/v/qiao-z-upload.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-upload)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-upload.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-upload)

[qiao-z](https://www.npmjs.com/package/qiao-z) upload module

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

## version

### 0.0.6.20221107

1. qiao-z-upload

### 0.0.5.20220513

1. lerna

### 0.0.4.20200803

1. ncu

### 0.0.3.20191206

1. add funding

### 0.0.2.20190321

1. multer --> formidable

### 0.0.1.20190225

1. init project
2. gen
3. gen with ext
4. gen with name
