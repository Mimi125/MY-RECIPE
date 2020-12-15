const express = require('express');
const app =  express();

const hostname = 'localhost';
const port = 3000;

app.get('/', (req, res) => {
    res.send('<H1>Hello World!!!!</H1>');
});

app.get('/sayHello/:name', (req, res) => {
    res.status(200);
    let name = req.params.name;
    res.send(`<h1>Hello, ${name}`);
});

app.listen(port, () => {
    console.log(`Express is running on http://${hostname}:${port}/`);
});
