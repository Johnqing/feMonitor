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
}