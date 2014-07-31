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

