var express = require('express');
var router = express.Router();
// console.log(router);
var request = require('request');
var db = require('../models');

var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

router.post('/',function(req,res){
  db.links.create({longLink: req.body.url}).then(function(data){
    var hash = hashids.encode(data.id);
    data.hash = hash;
    data.save().then(function(encodedData){
    res.render('links/index', {encodedData:encodedData})
    });
  })
});