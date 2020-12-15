const express = require('express');
let app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.get('/users/:id', (req, res, next) => {
    res.send('사용자 정보 가져오기');
});

