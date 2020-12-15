const express = require('express');
let app = express();

const hostname = '127.0.0.1';
const port = 3000;

const users = require('./routes/users.js');
const boards = require('./routes/board.js');

app.use('/users', users);
app.use('/boards', boards);

app.listen(port, () => {
    console.log(`Express is running on http://${hostname}:${port}/`);
});

