const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect(db, { useMongoClient: true });

module.exports = { mongoose };

// mongodb://<dbuser>:<dbpassword>@ds061415.mlab.com:61415/gb-todo-app
// mongodb://gb-todo-app-user:H2LrYkqa@ds061415.mlab.com:61415/gb-todo-app

// gb-todo-app-user
// H2LrYkqa