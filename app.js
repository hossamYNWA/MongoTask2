const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dburl = "mongodb://localhost:27017";
const dbName = "lfcTeam";
let idToUpdate = null;
mongoClient.connect(dburl, (err, client) => {
    if (err) {
        console.error("error in connection");
    }
    const db = client.db(dbName);
    //adding 2 documents to the collection
    const collection = db.collection("team");
    collection.insertOne({ name: "virgil", age: 31 }, (error, player) => {
        if (error) {
            console.error("error in inserting");
        } else {
            console.log("inserted successfully" + player.insertedId);
        }
    });
    collection.insertOne({ name: "matip", age: 32 }, (error, player) => {
        if (error) {
            console.error("error in inserting");
        } else {
            idToUpdate = player.insertedId;
            console.log("inserted successfully" + player.insertedId);
        }
    });
    // adding 10 players 5 of them 27 years
    collection.inserMany(
        [
            { name: "robo", age: 30 },
            { name: "endo", age: 30 },
            { name: "mac", age: 27 },
            { name: "trent", age: 27 },
            { name: "gomez", age: 27 },
            { name: "konate", age: 27 },
            { name: "stevan", age: 20 },
            { name: "elliot", age: 20 },
            { name: "diogo", age: 27 },
            { name: "darwin", age: 20 },
        ],
        (error, players) => {
            if (error) {
                console.error("error in inserting data");
            } else {
                console.log(
                    "added players successfuly" + players.insertedCount,
                );
            }
        },
    );
    // reading players with age 27
    collection.find({ age: 27 }).toArray((error, players) => {
        if (error) {
            console.error("error in reading data");
        } else {
            console.log("found players successfuly" + players);
        }
    });
    // reading players with age 27 limit 3
    collection
        .find({ age: 27 })
        .limit(3)
        .toArray((error, players) => {
            if (error) {
                console.error("error in reading data");
            } else {
                console.log("found players successfuly" + players);
            }
        });
    // updating player with id
    collection.updateOne(
        { _id: mongodb.ObjectId(idToUpdate) },
        { $set: { name: "tsimikas" }, $inc: { age: 1 } },
    );
    // update many players
    collection
        .updateMany({ age: 20 }, { $inc: { age: 20 } })
        .then((result) => {
            console.log(result.modifiedCount);
        })
        .catch((error) => {
            console.error(error);
        });
    // update first 4 players ages
    collection
        .updadeMany({}, { $inc: { age: 10 } }, { limit: 4 })
        .then((result) => {
            console.log(result.modifiedCount);
        })
        .catch((error) => {
            console.error(error);
        });
    // delete player with age 27
    collection.deleteMany({ age: 27 }).then((result) => {
        console.log(result.deletedCount);
    });
});
