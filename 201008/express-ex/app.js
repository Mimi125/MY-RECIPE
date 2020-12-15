var express = require('express');
var app = express();

var user = require('./routes/user');
app.use('/user', user);

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.listen(3000, () => {
    console.log('Example App listening on port 3000');
});

