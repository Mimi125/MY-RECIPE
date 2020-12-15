const { RSA_NO_PADDING } = require('constants');
var express = require('express');
var fs = require('fs'); // 파일을 읽고 쓸 수 있는 모듈
var app = express();

app.get('/main', (req, res) => {
  fs.readFile('HTML/main.html', function(error, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.get('/famous', (req, res) => {
  fs.readFile('HTML/Famous-recipe.html', function(error, data){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(data);
  });
});

app.get('/famous-main', (req, res) => {
  fs.readFile('HTML/Famous-recipe-main.html', function(error, data){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(data);
  });
});

app.get('/famous-detail', (req, res) => {
  fs.readFile('HTML/Famous-recipe-detail.html', function(error, data){
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.end(data);
  });
});

app.get('/user', (req, res) => {
  fs.readFile('HTML/User-recipe.html', function(error, data){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(data);
  });
});


app.get('/user-main', (req, res) => {
  fs.readFile('HTML/User-recipe-main.html', function(error, data){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(data);
  });
});

app.listen(3000, () => {
  console.log("Server startup success");
})
