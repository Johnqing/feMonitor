var http = require('http')
    , path = require('path')
    , app = require('./lib/http')
    , route = require('./routes')
    , pull = require('./lib/pull')
    , crawl = require("./routes/crawl")
    , conf = require('./config')

app.set('views', __dirname + '/views');
app.set('engine', 'n-tpl');
app.static('public');

//路由
app.get('/', route.index);
app.get('/error', route.error);


http.createServer(app).listen(80, '127.0.0.1');
console.log('port:80. You can 127.0.0.1')