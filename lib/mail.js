var nodemailer = require('nodemailer');

/**
 * 配置
 * @type {*}
 */
var adminMailCONf = {
    service: "Gmail",
    auth: {
        user: null,
        pass: null
    }
}
var smtpTransport;

/**
 * 发送邮件
 * @param mailConf
 * @param data
 */
var send = function(mailConf, data, callback){
    smtpTransport.sendMail(mailConf, callback);
}

send.setAdminConf = function(conf){
    adminMailCONf.service = conf.service;
    adminMailCONf.auth.user = conf.user;
    adminMailCONf.auth.pass = conf.pass;
    smtpTransport = nodemailer.createTransport("SMTP", adminMailCONf);
}
module.exports = send;




