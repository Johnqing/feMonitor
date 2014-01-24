var http = require('http');

module.exports = function(url, callback){
    http.get(url, function(res){
        var data = '';

        res.on('data', function(chunk){
            data += chunk;
        })

        res.on('end', function(){
            callback && callback(data);
        }).on('error', function(){
            callback && callback(null);
        })

    })
}