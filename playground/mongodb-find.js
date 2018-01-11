const {MongoClient, ObjectID} = require('mongodb');  // using Object Destructuring
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB server', err);
  }
  console.log('Connected successfully to the MongoDB server');

  const db = client.db(dbName);

  // query for a todo that have a certain id
  // const collection = db.collection('Todos');
  // collection.find({
  //   _id: new ObjectID('5a54a1bc69456626d01f48f3')
  // }).toArray().then((docs) => {
  //   console.log('Todo that have the id of 5a54a1bc69456626d01f48f3');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  // get all the todo documents
  // const collection = db.collection('Todos');
  // collection.find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  // query for todos that have not been completed
  // const collection = db.collection('Todos');
  // collection.find({completed: true}).toArray().then((docs) => {
  //   console.log('Todos that have not been complete');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  // count all the todos in the Todos collection
  // const collection = db.collection('Todos');
  // collection.find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  // query for users that have a specific user
  const collection = db.collection('Users');
  collection.find({name: 'Teri'}).toArray().then((docs) => {
    console.log('Users that have the name = Teri');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err)
  });

  // client.close();
});