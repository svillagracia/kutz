var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var db = require('./models');

var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req,res){
  res.render('index');
});

app.post('/links',function(req,res){
  db.link.create({longLink: req.body.url}).then(function(data){
    var hash = hashids.encode(data.id);
    data.shortLink = hash;
    data.save().then(function(encodedData){
    res.render('links', {encodedData:data.shortLink})
    });
  })
});

app.get('/:hash',function(req,res){
  db.link.find({where: {shortLink: req.params.hash}}).then(function(url){
    res.redirect(url.longLink);
  });
});

app.listen(process.env.PORT || 3000,function(){
  console.log('Goliath Online. Port: 3000...');
});