(function(globle, undefined){
    function loadjs(url, params){
        params = params ? '?'+params : '';

        var script = document.createElement('script')
        script.type = "text/javascript";
        script.src = url + params + '&callback=jsonp';
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    var DEFAULTCONFIG = {
        url: 'http://fm.com'
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
                loadjs(that.url, 'cururl='+encodeURIComponent(globle.location.href)+'&monitor=curr');
            }
        },
        errNotice: function(msg, url, line){
            var params = 'url=' + url +
            '&message=' + encodeURIComponent(msg) +
            '&line=' + line +
            '&ua=' + encodeURIComponent(navigator.userAgent);
            //
            loadjs(this.url, params+'&monitor=error');
        }
    }
    globle.monitor = function(opts){
        opts = opts || {};
        new Monitor(opts);
    }
})(this);