var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();
//app.use(serveStatic("/Users/takeru/Sites/sportsstore"));
app.use(serveStatic("./"));
app.listen(5000);