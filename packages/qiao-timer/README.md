## qiao-timer

[![npm version](https://img.shields.io/npm/v/qiao-timer.svg?style=flat-square)](https://www.npmjs.org/package/qiao-timer)
[![npm downloads](https://img.shields.io/npm/dm/qiao-timer.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-timer)

nodejs 下的 timer 能力

## install

安装

```shell
npm i qiao-timer
```

## use

使用

```javascript
// cjs
const { run } = require('qiao-timer');

// mjs
import { run } from 'qiao-timer';
```

## api

### run

按 time 执行 tick 函数

- time
  - 类型: string
  - 说明: cron 表达式，例如'_/1 _ \* \* \* \*'
- tick
  - 类型: function
  - 说明: 执行函数

```javascript
run(time, tick);
```

### runAndInit

按 time 执行 tick 函数, 启动前会先执行一次 tick 函数

- time
  - 类型: string
  - 说明: cron 表达式，例如'_/1 _ \* \* \* \*'
- tick
  - 类型: function
  - 说明: 执行函数

```javascript
runAndInit(time, tick);
```
