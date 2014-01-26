var nodeMail = require('./mail');
var conf = require('../config');

function isArray(pr){
    return Object.prototype.toString.call(pr) == '[object Array]';
}


module.exports = {
    setOpts: function(host){
        this.from = conf.admin.user;
        nodeMail.setAdminConf(conf.admin);
        var from = conf.from[host]
        for(var key in from){
            this[key] = from[key];
        }
        this.site = host;
    },
    setHtml: function(data){
        if(isArray(data)){
            var html = '<h5>未压缩文件：</h5>'
            html += data.join('<br>');
            html += '<hr>';
            this.html = html;
            return;
        }
        var html = ['<ul>'];
        for(var i in data){
            html.push('<li><strong>'+i+'：</strong> '+data[i]+'</li>');
        }
        this.html = html.join('') + '</ul>';
    },
    sendNotice: function(req, callback){
        this.setOpts(req.host);
        this.setHtml(req.data);
        nodeMail(this, req, callback);
    }
};