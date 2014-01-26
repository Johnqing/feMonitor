var notice = require('../lib/notice')
    ,crawl = require('../lib/crawl');


function urlParse(query){
    query = decodeURIComponent(query);
    query = query.substring(2, query.length);
    query = query.split('&');

    var data = {};

    for(var i=0; i<query.length; i++){
        var q = query[i].split('=');
        data[q[0]] = q[1];
    }

    return data;
}


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
    var urlData = urlParse(req.url);

    function noticeMail(data){
        notice.sendNotice(data, function(error, response){
            if(error){
                console.log(error);
                return;
            }
            console.log(response)
        });
    }


    if(urlData.monitor == 'curr'){
        crawl.pull(urlData.cururl, function(notMini){
            if(!notMini.length) return;
            data.data = notMini;
            noticeMail(data);
        });
    }else{
        data.data = urlData;
        noticeMail(data);
    }

    res.end();

}