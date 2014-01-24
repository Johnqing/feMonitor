(function(win) {
  var Err = function(){},
      err;
  /**
   * 错误信息收集前台使用
   * @type {Array}
   * @example console.log(ErrHandling);
   */
  win.ErrHandling = [];
  win.ErrUrl = '/error';

  Err.prototype = {
    run: function(){
      var self = this;

      return function(msg, url, line) {
        ErrHandling.push(msg + '#' + line);
        self.ajax(msg, url, line);
      }
    },
    ajax: function(msg, url, line){
      var xmlhttp, params;

      params = 'url=' + url +
      '&message=' + msg +
      '&line=' + line +
      '&ua=' + navigator.userAgent;

      xmlhttp = creatHttp();

      xmlhttp.open('post', ErrUrl, true);//获取数据
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send(params);

    }
  }
/**
 * xmlhttp
 * @return {[type]} [Object]
 */
  var creatHttp = function(){
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

  err = new Err();

  win.onerror = err.run();

})(this);

