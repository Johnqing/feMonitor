//TODO:分析页面中的a链接并且递归抓取



var cheerio = require("cheerio")

exports.pull = function(data){
    if(!data){
        console.log(data);
        return;
    }
    var $ = cheerio.load(data);
    $('a,link,script').each(function(){

    })

}