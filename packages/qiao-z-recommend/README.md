## qiao-z-recommend

[![npm version](https://img.shields.io/npm/v/qiao-z-recommend.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-recommend)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-recommend.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-recommend)

[qiao-z](https://qiao-z.vincentqiao.com/#/) recommend module

## 安装

```shell
npm i qiao-z qiao-z-recommend
```

## 使用示例

qiao-z中使用qiao-z-recommend的示例

```javascript
// recommend
const recommend = require('qiao-z-recommend');

// options
const options = {
  // recommend
  config: config,
  modules: [recommend.init],
};

// app
const app = require('qiao-z')(options);

// listen
app.listen(port);
```

## 内置路由

- `/recommend/list`: 列出推荐
- `/recommend/change`: 兑换推荐
