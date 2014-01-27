/**
 * 通过ua返回浏览器信息
 * @param UA
 * @returns {String}
 */
module.exports = function(UA){
    UA = UA.toLowerCase();
    var _brower,
        Brower = {},
        browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos|trident)[ \/os]*([\d_.]+)/ig


    UA.replace(browserTester, function(a, b, c){
        if(!Brower[b]){
            Brower[b] = c;
        }
    });
    _brower = Brower.chrome ? 'chrome'+Brower.chrome : 'safari' + +Brower.safari;
    if(Brower.opera){
        _brower = 'opera'+Brower.opera;
        // Opera9.8后版本号位置变化
        UA.replace(/opera.*version\/([\d.]+)/, function(a, b){
            Brower.opera = b;
            _brower = 'opera'+b;
        });
    }
    //IE 11 的 UserAgent：Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv 11.0) like Gecko
    if(!Brower.msie && Brower.trident){
        UA.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/ig, function(a, c){
            Brower.msie = c;
            _brower = 'IE' + c;
        })

    }

    if(Brower.msie){
        Brower.ie = Brower.msie;
        var v = parseInt(Brower.ie, 10);
        Brower['ie'+v] = true;
        _brower = 'ie'+v;
    }

    return _brower;
}