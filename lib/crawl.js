var urlPackage = require('url')
    , cheerio = require('cheerio')
    , unit = require('./unit')
    , pull = require('./pull')
    , conf = require('../config')

function isMinified(contents) {
    var len = contents.length,
        striplen;

    if (len === 0) { // blank is as minified as can be
        return true;
    }

    // TODO: enhance minifier logic by adding comment checking: \/\/[\w\d \t]*|\/\*[\s\S]*?\*\/
    // 空格 换行 制表符删除
    striplen = contents.replace(/\n| {2}|\t|\r/g, '').length;
    // 查看空格 换行 制表符等是否超过20%
    if (((len - striplen) / len) > 0.2) {
        return false;
    }

    return true;
}


exports.pull = function(url, callback){
    url = url.split('?')[0];

    var notMinified = [];

    pull(url, function(url, data){
        url = urlPackage.parse(url);
        var static = conf.from[url.hostname].static;
        var $ = cheerio.load(data);
        var node = $('script[src], link');
        var len = node.length - 1;
        node.each(function(i){
            var type = $.html(this).indexOf('<link') == -1 ? 'src' : 'href';
            var truePath = static+ $(this).attr(type);
            truePath = unit.realpath(truePath);
            // 拉取内容判断是否压缩
            pull(truePath, function(url, cont){
                if(!cont) return;
                if(!isMinified(cont)){
                    notMinified.push(truePath);
                }
                if(len == i){
                    callback && callback(notMinified);
                }
            });
        });
    });
}