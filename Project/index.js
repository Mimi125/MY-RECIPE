var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');
var db = mongoose.connection;
db.on('error', consol.error.bind(console, 'connection error: '));
db.once('open', function callback(){
    console.log("mongo db connection OK");
})