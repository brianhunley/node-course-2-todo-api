const MongoClient = require('mongodb').MongoClient;

// mongodb://gb-todo-app-user:H2LrYkqa@ds061415.mlab.com:61415/gb-todo-app

const MONGO_URL = 'mongodb://gb-todo-app-user:H2LrYkqa@ds061415.mlab.com:61415/gb-todo-app';

MongoClient.connect(MONGO_URL, (err, db) => {  
  if (err) {
    return console.log(err);
  }

  // Do something with db here, like inserting a record
  db.collection('todos').insertOne(
    {
      text: 'Learn Node.js',
      completed: false,
      completeAt: 123
    },
    function (err, res) {
      if (err) {
        db.close();
        return console.log(err);
      }
      // Success
      db.close();
    }
  )
});