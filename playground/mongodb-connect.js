// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  // using Object Destructuring

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {

// generate a new ObjectID on our own, can be used for about anything!
// var obj = new ObjectID();
// console.log('objId:', obj);

// Object Destructuring Example
// i.e., getting individual fields from objects
// var user = {name: 'Brian', age: 25};
// var {name} = user;
// var {age} = user;
// console.log('name:', name);
// console.log('age:', age);

  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  }
  console.log('Connected to MongoDB server');

  // Insert new doc into the Todos (text, completed) collection
  // const db = client.db('TodoApp');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into the Users (name, age, location) collection
  // const db = client.db('TodoApp');
  // db.collection('Users').insertOne({
  //   name: 'Brian',
  //   age: 53,
  //   location: 'Englewood, OH'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log('ObjectId:', result.ops[0]._id);
  //   console.log('Timestamp:', result.ops[0]._id.getTimestamp());
  // });

  client.close();
});