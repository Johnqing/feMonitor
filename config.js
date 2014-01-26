module.exports = {
    admin: {
        service: 'qq',
        user: 'johnqing@qq.com',
        pass: 'password'
    },
    from: {
        'fm.com': {
            static: 'http://fm.com/',
            url: 'http://127.0.0.1',
            to: "johnqing@qq.com", // 抄送
            subject: "前端bug列表"
        }
    }
}