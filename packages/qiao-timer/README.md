## qiao-timer

[![npm version](https://img.shields.io/npm/v/qiao-timer.svg?style=flat-square)](https://www.npmjs.org/package/qiao-timer)
[![npm downloads](https://img.shields.io/npm/dm/qiao-timer.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-timer)

nodejs 下的 timer 能力

## install

安装

```bash
npm i qiao-timer
```

## api

### run

按 time 执行 tick 函数

```javascript
const { run } = require('qiao-timer');

const time = '*/1 * * * * *';
const tick = () => {
  console.log(new Date());
};

console.log('-' + new Date());
run(time, tick);
```

### runAndInit

按 time 执行 tick 函数, 启动前会先执行一次 tick 函数

```javascript
const { runAndInit } = require('qiao-timer');

const time = '*/1 * * * * *';
const tick = () => {
  console.log(new Date());
};

console.log('-' + new Date());
runAndInit(time, tick);
```

## version

### 0.0.5.20230124

1. 1.0.0

### 0.0.4.20220422

1. add lerna

### 0.0.3.20200803

1. ncu

### 0.0.2.20191204

1. update packages
2. add funding

### 0.0.1.20190107

1. init
2. add cron method
3. add job method
4. add run method
5. add runAndInit method
6. nodejs timer tool
