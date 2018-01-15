const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// const id = '5a5c1ae409761f3b14c4c81611';

// if (!ObjectID.isValid(id)) {
//   console.log('ID is not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos:', JSON.stringify(todos, undefined, 2));
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo:', JSON.stringify(todo, undefined, 2));
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Todo by Id: Id not found');
//   }
//   console.log('Todo by Id:', JSON.stringify(todo, undefined, 2));
// }).catch((err) => console.log(err));

const id = '5a5bedd2010a6a40d400915f';
if (!ObjectID.isValid(id)) {
  return console.log('ID is not valid');
}
User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by Id:', JSON.stringify(user, undefined, 2));
}).catch((err) => console.log(err));