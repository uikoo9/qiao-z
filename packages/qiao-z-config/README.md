## qiao-z-config

[![npm version](https://img.shields.io/npm/v/qiao-z-config.svg?style=flat-square)](https://www.npmjs.org/package/qiao-z-config)
[![npm downloads](https://img.shields.io/npm/dm/qiao-z-config.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-z-config)

[qiao-z](https://qiao-z.vincentqiao.com/#/) app module

## 安装

```shell
npm i qiao-z qiao-z-config
```

## 使用示例

qiao-z中使用qiao-z-config的示例

```javascript
// options
const options = {
  // server config
  config: config,
  modules: [require('qiao-z-config').init],
};

// app
const app = await require('qiao-z')(options);
app.listen(port);
```

## 内置路由

- `/config`: 获取配置
