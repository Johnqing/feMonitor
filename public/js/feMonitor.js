(function(globle, undefined){

    /**
     * xmlhttp
     * @return {[type]} [Object]
     */
    function creatHttp(){
        var xmlhttp;
        try {
            xmlhttp = new XMLHttpRequest(); // Mozilla / Safari / IE7
        } catch (e) {
            // IE
            var XMLHTTP_IDS = new Array('MSXML2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP.4.0',
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP' );
            var success = false;
            for (var i=0;i < XMLHTTP_IDS.length && !success; i++) {
                try {
                    xmlhttp = new ActiveXObject(XMLHTTP_IDS[i]);
                    success = true;
                } catch (e) {}
            }
            if (!success) {
                throw new Error('Unable to create XMLHttpRequest.');
            }
        };
        return xmlhttp;
    }

    function ajax(url, params){
        var xmlhttp = creatHttp();
        params = params ? '?'+params : '';
        xmlhttp.open('get', url+params, true);//获取数据
        xmlhttp.setRequestHeader("X-Requested-With","XMLHttpRequest");
        xmlhttp.send();
    }


    var DEFAULTCONFIG = {
        url: '/'
    }

    /**
     * 监控类
     * @constructor
     */
    function Monitor(opts){
        this.url = opts.url || DEFAULTCONFIG.url;

        this.handle = [];

        this.init();
    }
    Monitor.prototype = {
        init: function(){
            var that = this;
            // 错误处理
            globle.onerror = function(){
                return function(msg, url, line) {
                    that.handle.push(msg + '#' + line);
                    that.errNotice(msg, url, line);
                }
            }();
            // 抓取当前页面
            globle.onload = function(){
                ajax(this.url, '&curpage=1');
            }
        },
        errNotice: function(msg, url, line){
            var params = 'url=' + url +
            '&message=' + msg +
            '&line=' + line +
            '&ua=' + navigator.userAgent;
            //
            ajax(this.url, params+'&err=1');
        }
    }
    globle.monitor = function(opts){
        opts = opts || {};
        new Monitor(opts);
    }
})(this);