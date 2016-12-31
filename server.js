var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var os = require('os');

var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded());

function getIP(req) {
    return req.header('x-forwarded-for') || req.connection.remoteAddress;
}

function getLanguage(req){
  tempLang = req.headers["accept-language"];
  tempLang= tempLang.split(',')
  return tempLang[0];
}

function getSoftware(req){
  var platform;
  var arch = os.arch();
  if (arch == 'x64'){ // correction for bug where os.platform() returns node binary and not user cpu kernel
    platform = 'Win64';
  }
  else{
    platform = os.platform();
  }
  var tempSoftware = os.type() +"; " + os.release() +"; " +platform +"; "+ arch;
  return tempSoftware;
}

app.get('/', function(req, res) {
    var ip = getIP(req);
    var language = getLanguage(req);
    var software = getSoftware(req);

    var returnObject = {
        "IP Address": ip,
        "Language":language,
        "Software": software
    };
    res.send(returnObject);
});

app.listen(port, function() {
    console.log("Listening on port " + port);
});
