## qiao-mysql

[![npm version](https://img.shields.io/npm/v/qiao-mysql.svg?style=flat-square)](https://www.npmjs.org/package/qiao-mysql)
[![npm downloads](https://img.shields.io/npm/dm/qiao-mysql.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-mysql)

nodejs 下 mysql 能力

## install

安装

```shell
npm i qiao-mysql
```

## config

配置文件，如果传入 connectionLimit 会使用 connection pool

```json
{
  "connectionLimit": 10,
  "host": "127.0.0.1",
  "port": 3306,
  "database": "xxx",
  "user": "xxx",
  "password": "xxx"
}
```

## client

```javascript
// config
const config = require('./config.json');

// client
const client = require('qiao-mysql')(config);
```

## api

### getColumns

获取表的列属性

```javascript
const res = await client.getColumns('t_todo_item');
console.log(res);
```

### getTypes

获取表字段类型对应的 js 类型

```javascript
const type = client.getTypes('varchar(10)');
console.log(type);
```

### query

查询数据库

|-- 如果配置文件中没有 connectionLimit 属性，则每次创建 connection 后查询

|-- 如果配置文件中有 connectionLimit，则使用 connection pool 查询

```javascript
const rows = await client.query('select * from t_todo_item where id=?', [8]);
console.log(rows);
```
