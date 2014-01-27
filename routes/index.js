var notice = require('../lib/notice')
    ,crawl = require('../lib/crawl')
    ,browser = require('../lib/browser')

exports.test = function(req, res){
    res.render('index', {
        title: '测试'
    })
}

exports.index = function(req, res){
    res.writeHead(200, {
        "Content-Type":"application/json; charset=UTF-8"
    });
    // 设置数据
    var data = {
        host: req.host,
        data: {}
    }
    function noticeMail(_data){
        data.data = _data;
        notice.sendNotice(data, function(error, response){
            if(error){
                console.log(error.data);
                return;
            }
            console.log(response)
        });
    }
    if(req.monitor == 'curr'){
        crawl.pull(req.cururl, function(notMini){
            if(!notMini.length) return;
            noticeMail(notMini);
        });
    }else{
        req.ua = browser(req.ua);
        noticeMail(req);
    }

    res.end();

}