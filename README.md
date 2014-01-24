前端异常监控系统
======

## 使用

请配置 config.js，内容如下：

```
module.exports = {
    admin: {
        service: 'qq',
        user: 'johnqing@qq.com',
        pass: 'password'
    },
    from: {
        'http://127.0.0.1': {
            url: 'http://127.0.0.1',
            to: "johnqing@qq.com", // 抄送
            subject: "前端bug列表"
        }
    }
}`
```

以及在 error.js 中修改：

```
win.ErrUrl = '这里为该系统线上实际的地址'
```

## 运行app

```
node app
```

## 支持

+ 产生日志后自动发送邮件
+ js 错误日志定位到行
