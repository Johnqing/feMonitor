var notice = require('../lib/notice')
    ,crawl = require('../lib/crawl');

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
    function noticeMail(data){
        notice.sendNotice(data, function(error, response){
            if(error){
                console.log(error);
                return;
            }
            console.log(response)
        });
    }
    if(req.monitor == 'curr'){
        crawl.pull(req.cururl, function(notMini){
            if(!notMini.length) return;
            data.data = notMini;
            noticeMail(data);
        });
    }else{
        data.data = req;
        noticeMail(data);
    }

    res.end();

}