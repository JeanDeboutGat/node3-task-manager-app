const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { ObjectId } = require("mongodb");
const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
MongoClient.connect(connectionURL, (error, client) => {
  if (error) {
    console.log(error);
    return console.log("unable to connect to database");
  }
  console.log("connection to database established!");

  const db = client.db(databaseName);
  // db.collection('users').insertOne({
  //     name: 'Jean',
  //     age: 23
  // }, (error, result) => {
  //     if (error){
  //         return console.log('unable to insert a user')
  //     }
  //     console.log(result.ops)
  // })
  //   db.collection("users").insertMany([
  //     {
  //       name: "Jean",
  //       age: 23
  //     },
  //     {
  //         name: "Otty",
  //         age: 25
  //       },
  //   ], (error, result) =>{
  //       if (error) {
  //           return console.log('unable to insert documents')
  //       }
  //       console.log(result.insertedIds)
  //   });

    db.collection("users").deleteOne({ 
      age: { $gte: 9}})


  // db.collection("tasks").insertMany(
  //   [
  //     {
  //       description: "create and conenct database to node app",
  //       completed: true,
  //     },
  //     {
  //       description: "Insert data  into database",
  //       completed: false,
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log("unable to insert tasks in tasks collections!");
  //     }
  //     console.log(result.insertedIds);
  //   }
  // );
});
