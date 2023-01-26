## qiao-sms

[![npm version](https://img.shields.io/npm/v/qiao-sms.svg?style=flat-square)](https://www.npmjs.org/package/qiao-sms)
[![npm downloads](https://img.shields.io/npm/dm/qiao-sms.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-sms)

nodejs 下腾讯云 sms 常见 api 封装

## api

### options

发送短信的配置项

```javascript
{
  appid: 'your appid',
  appkey: 'your appkey',
  sign: 'your sign',
  mobile: 'mobile',
  msg: '您的验证码是：1234，如非本人操作，请忽略此短信。',
  mtype: '0：普通短信，1：营销短信，可选',
  cnum: '86：中国，可选',
}
```

### sendSMSMsg

发送短信，回调方式

```javascript
q.sendSMSMsg(options, (err, req, res, success, msg) => {
  console.log(err, req, res, success, msg);
});
```

### sendSMSMsgSync

发送短信，同步方式

```javascript
await q.sendSMSMsgSync(options);
```

## version

### 0.0.5.20221109

1. es6

### 0.0.4.20220512

1. lerna

### 0.0.3.20191206

1. add funding

### 0.0.2.20190107

1. nodejs tencent sms tool

### 0.0.1.20181127

1. init project
2. send
3. send sync
