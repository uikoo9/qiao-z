# qiao-server-coder

## use

qscoder -h

## code list

### 01

1. [node.js](https://nodejs.org/en/) server code by [express.js](http://www.expressjs.com.cn/)
2. file tree :

```shell
|--server
	|--config
		|--config-server.json
		|--config.json
	|--manage-db
		|--ucenter
			|--controller
				|--UcenterUserController.js
				...
			|--model
				|--UcenterUserModel.js
				|--ucenter-user-sql.json
				...
			|--service
				|--UcenterUserService.js
				...
	|--middleware
		|--qiao.index.js
		|--qiao.mid.js
		|--qiao.task.js
	|--app.js
	|--package.json
```

### 02

1. [jquery](http://jquery.com/) and [easyui](http://www.jeasyui.com/) on [coolie](https://coolie.ydr.me/) browser code
2. file tree :

```shell
|--files
|--server
	|--config
		|--config-cos.json
		|--config-server.json
		|--config.json
	|--fore
		|--manage
			|--controller
				|--ManageController.js
			|--service
				|--ManageService.js
	|--manage-api
		|--ucenter
			|--controller
				|--UcenterUserController.js
				...
			|--model
				|--UcenterUserModel.js
				|--ucenter-user-sql.json
				...
			|--service
				|--UcenterUserService.js
				...
		|--BaseService.js
	|--middleware
		|--qiao.index.js
		|--qiao.mid.js
	|--app.js
	|--package.json
|--webroot-dev
	|--static
		|--css
			|--app
				|--manage
					|--manage.css
			|--lib
				normalize.css
				...
		|--img
		|--js
			|--app
				|--manage
					|--home
						|--home-item.js
					|--manage-index.js
					|--manage-login.js
			|--lib
			|--coolie-config.js
		|--plugins
	|--views
		|--_inc
		|--manage
			|--home
				|--home-item-edit.html
				|--home-user-edit.html
			|--manage-index.html
			|--manage-login.html
	|--coolie.config.js
	|--package.json
```
