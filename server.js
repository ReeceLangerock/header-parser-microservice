var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var os = require('os');

var app = express();

var port = process.env.PORT || 3000;

function getIP(req) {
    return req.header('x-forwarded-for') || req.connection.remoteAddress;
}

function getLanguage(req){
  tempLang = req.headers["accept-language"];
  tempLang= tempLang.split(',')
  return tempLang[0];
}

function getSoftware(req){
  var tempSoftware = req.headers['user-agent'];
  tempSoftware = tempSoftware.match(/\(([^)]+)\)/)[1];
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
