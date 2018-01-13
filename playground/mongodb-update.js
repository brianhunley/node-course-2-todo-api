const {MongoClient, ObjectID} = require('mongodb');  // using Object Destructuring
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB server', err);
  }
  console.log('Connected successfully to the MongoDB server');

  const db = client.db(dbName);

  // findOneAndUpdate
  // const collection = db.collection('Todos');
  // collection.findOneAndUpdate(
  //   { _id: new ObjectID('5a58d01fc1b8760b284af7b8') },
  //   { 
  //     $set: { complete: true } 
  //   }, {
  //     returnOriginal: false
  //   }
  // ).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to update todo', err)
  // });

  // findOneAndUpdate with increment field operator
  const collection = db.collection('Users');
  collection.findOneAndUpdate(
    { _id: new ObjectID('5a54a2fe59bd012e981c517a') }, 
    { 
      $set: { name: 'Brian' },
      $inc: { age: 1 }
    }, {
      returnOriginal: false
    }
  ).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }, (err) => {
    console.log('Unable to update todo', err)
  });

  // client.close();
});