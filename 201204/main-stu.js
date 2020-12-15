const MongoDB = require("mongodb").MongoClient,
dbURL = "mongodb://localhost:27017",
dbName = "recipe-db";

MongoDB.connect(dbURL, {useUnifiedTopology:true}, (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);
    db.collection("contact")
    .find()
    .toArray((error, data) => {
        if (error) throw error;
        console.log(data);
    });
    db.collection("contacts")
    .insertOne({
        name: "Freddie Mercury",
        email: "fred@queen.com"
    }, (error, db) => {
        if (error) throw error;
        console.log(db);
    });
});