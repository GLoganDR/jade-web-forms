'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.get('/boxes', function(req, res){
  res.render('boxes');
});

app.post('/boxes', function(req, res){
  var count = req.body.count * 1;
  var colors = req.body.colors.split(',');
  var heights = req.body.height.split('-');
  var widths = req.body.width.split('-');

  colors = colors.map(function(c){return c.trim();});
  widths = widths.map(function(n){return n * 1;});
  heights = heights.map(function(n){return n * 1;});

  res.render('pbox', {colors:colors, widths:widths, heights:heights, count:count});
});

app.post('/calc', function(req, res){
  var ans = 0;
  if(req.body.symbol === '+'){
    ans = (req.body.x * 1) + (req.body.y * 1);
  }else if(req.body.symbol === '-'){
    ans = (req.body.x * 1) - (req.body.y * 1);
  }else if(req.body.symbol === '*'){
    ans = (req.body.x * 1) * (req.body.y * 1);
  }else{
    ans = (req.body.x * 1) / (req.body.y * 1);
  } 
res.render('calc', {ans:ans});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});

