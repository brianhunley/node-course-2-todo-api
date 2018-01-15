const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findOneAndRemove({_id: '5a5d1a0120cc4515b9b0346f'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5a5d1a0120cc4515b9b0346f').then((todo) => {
  console.log(todo);
});