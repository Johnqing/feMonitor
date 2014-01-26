前端异常监控系统
======

监控静态资源是否出现错误

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
        'fm.com': {
            url: 'http://127.0.0.1',
            to: "johnqing@qq.com", // 抄送
            subject: "前端bug列表"
        }
    }
}`
```

在页面内引入：

```
<script src="feMonitor.js"></script>
<script>
monitor({
    url: '此处为前端监控系统实际请求地址'
});
</script>
```

## 运行app

```
node app
```

## 支持

+ 产生日志后自动发送邮件
+ js 错误日志定位到行
