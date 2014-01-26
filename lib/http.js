var http = require('http')
    ,fs = require('fs')
    ,path = require('path')
    ,url = require('url')
    , mine = require('./mine').types
    , unit = require('./unit')
    ,engine

// 路由注册
var routes = {}
var settings = {}



function getMine(realPath){
    var ext = path.extname(realPath);
    return ext ? ext.slice(1) : 'unknown';
}

function setStatic(url){
    var ext = path.extname(url);
    if(!ext) return url;
    return unit.realpath(settings.static + url);
}

function wrHead(res, opts){
    var errNum = opts.errno || 200,
        type = opts.type || 'text/plain',
        text = opts.text;

    res.writeHead(errNum, {
        'Content-Type': type
    });
    res.end(text);
}

function urlParse(chunk){
    var chunkArr = chunk.split('&');
    var chunkObj = {};
    for(var i=0; i<chunkArr.length; i++){
        var ck = chunkArr[i].split('=');
        chunkObj[ck[0]] = ck[1];
    }
    return chunkObj;
}

// app 入口
var app = function(req, res){
    var pathName = url.parse(req.url).pathname,
        params = url.parse(req.url, true);


    //jsonp
    if(params.query && params.query.callback){
        console.log(params.query);
        var query = urlParse(params.query);
        routes[pathName] && routes[pathName](query, res);
        return
    }

    var XMLHttpReq = req.headers["x-requested-with"];

    // ajax
    if(XMLHttpReq == "XMLHttpRequest"){
        var postData = {};
        // 设置接收数据编码格式为 UTF-8
        req.setEncoding('utf8');

        // 接收数据块并将其赋值给 postData
        req.on('data', function(chunk) {
            postData = urlParse(chunk);
        });
        req.on('end', function() {
            postData['host'] = req.headers['host'].toString();
            postData['url'] = req.url;
            routes[pathName] && routes[pathName](postData, res);
            // 数据接收完毕，执行回调函数
        });
        return;
    }
    var realPath = setStatic(pathName);


    var resData;
    res.render = function(r, data){
        realPath = settings.views + '/' +r + '.html';
        resData = data;
    };
    routes[pathName] && routes[pathName](req, res);

    // 文件读取
    fs.readFile(realPath, 'utf8', function (err, content) {
        if(err){
            return;
        }
        wrHead(res, {
            type: mine[getMine(realPath)],
            text: resData ? engine.tpl(content, resData) : content
        })
    });
}
/**
 * 配置
 * @param key
 * @param value
 */
app.set = function(key, value){

    if(key == 'engine'){
        engine = require(value);
        return;
    }

    settings[key] = value;
    return this;
}
/**
 * 路由解析
 * @param r
 * @param callback
 * @returns {*}
 */
app.get = function(r, callback){
    routes[r] = callback
    return this;
}


app.static = function(path){
    settings['static']  = path;
}
//
module.exports = app;