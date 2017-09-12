var express = require('express');
var bodyparser = require('body-parser');
var app = express();

console.log("server running");
app.use('/', bodyparser.urlencoded({extended : false}));
app.use('/', express.static(__dirname + "/assets" ));

app.post('/submit', function (req,res) {
    var numdays = Math.round(((new Date()) - Date.parse(req.body.DOB))/(24*3600*1000));

    res.send("Hey " + req.body.firstname + " you have lived on the planet for " + numdays + " days");
})

app.listen(5000);