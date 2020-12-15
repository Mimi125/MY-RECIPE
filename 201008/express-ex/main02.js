var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log('Example App listening on port 3000');
});

app.get('/user/:id', (req, res) => {
    res.send('Received a GET request, param:' +req.params.id );
});

app.post('/user', (req, res) => {
    res.json({ success: true })
});

app.put('/user', (req, res) => {
    res.status(400).json({ message: 'Hey, you. Bad Request!' })
});

app.delete('/user', (req, res) => {
    res.send('Received a DELETE request')
});