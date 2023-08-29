# qiao-z-coder

## 创建数据库

先需要创建一个数据库

```shell
create database db_photos;
```

然后创建rbac的数据库表

```shell
source ./manage.sql;
```

## init

初始化代码项目

- type
  - monorepo: 初始化一个前端monorepo项目
  - manage: 初始化一个带管理端的前端项目

```shell
npm run gen-init type /path/to/init/code
```

## gen

生成server和view对应的代码

```shell
npm run gen t_ucenter_user /path/to/gen/code
```
