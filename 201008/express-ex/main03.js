var express = require('express');
var app = express();

app.get('/', (req, res, next) => {
    res.status(201).send("hello world!!");
});

app.get('/send', (req, res, next) => {
    res.status(201).send('<h1> Hello World!! </h1> ');
});

app.get('/download', (req, res, next) => {
    res.download('./test.txt');
});

app.get('/redirect', (req, res, next) => {
    res.redirect('/send');
});

app.get('/json', (req, res, next) => {
    res.json({ message: 'success', code: 0 });
});

app.listen(3000, () => {
    console.log('Example App listening on port 3000');
});