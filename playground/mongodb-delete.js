const {MongoClient, ObjectID} = require('mongodb');  // using Object Destructuring
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB server', err);
  }
  console.log('Connected successfully to the MongoDB server');

  const db = client.db(dbName);

  // deleteMany Todos
  // const collection = db.collection('Todos');
  // collection.deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete todos', err)
  // });

  // deleteOne Todo
  // const collection = db.collection('Todos');
  // collection.deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete todo', err)
  // });

  // findOneAndDelete a Todo
  // const collection = db.collection('Todos');
  // collection.findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete todo', err)
  // });

  // deleteMany Users
  // const collection = db.collection('Users');
  // collection.deleteMany({name: 'Brian'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete users', err)
  // });

  // deleteOne Todo
  // const collection = db.collection('Users');
  // collection.findOneAndDelete({
  //   _id: new ObjectID('5a5a37aac1b8760b284b64e9')
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to delete user', err)
  // });

  // client.close();
});