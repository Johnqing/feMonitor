var nodeMail = require('../lib/mail');
var conf = require('../config');

var mailOpts = {
    setOpts: function(req){
        this.from = conf.admin.user;
        nodeMail.setAdminConf(conf.admin);
        var from = conf.from[req.host]
        for(var key in from){
            this[key] = from[key];
        }
    },
    setHtml: function(data){
        var html = [];

        for(var i in data){
            html.push('<li><strong>'+i+'：</strong> '+data[i]+'</li>');
        }

        this.html = html.join('');
    },
    sendNotice: function(req, callback){
        this.setOpts(req);
        this.setHtml(req);
        nodeMail(this, req, callback);
    }
};

exports.test = function(req, res){
    res.render('index', {
        title: '测试'
    })
}

exports.index = function(req, res){
    res.writeHead(200, {
        "Content-Type":"application/json; charset=UTF-8"
    });

    mailOpts.sendNotice(req, function(error, response){
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
    })

}
exports.notice = function(req, res){
    //抓取页面
    pull(conf.crawlUrl, crawl.pull);
}
