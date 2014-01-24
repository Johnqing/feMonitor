var nodeMail = require('../lib/mail');
var conf = require('../config');

exports.index = function(req, res){
    res.render('index', {
        title: '前端监控系统测试'
    });
}

var mailOpts = {};
function setHTML(data){

    var html = [];

    for(var i in data){
        html.push('<li><strong>'+i+'：</strong> '+data[i]+'</li>');
    }

    mailOpts.html = html.join('');
}

exports.error = function(req, res){
    mailOpts.from = conf.admin.user;
    nodeMail.setAdminConf(conf.admin);

    for(var key in conf.from){
        mailOpts[key] = conf.from[key];
    }

    setHTML(req);

    res.writeHead(200, {
        "Content-Type":"application/json; charset=UTF-8"
    });
    nodeMail(mailOpts, req, function(error, response){
        if(error){
            var json = {
                errorCode: 1000,
                error: error
            }
        }else{
            var json = {
                sucCode: 0,
                suc: response.message
            }
        }
        var backJson = JSON.stringify(json)

        res.write(backJson);
        res.end();
    });
}