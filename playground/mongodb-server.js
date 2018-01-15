const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });

// const Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// const testTodo = new Todo({
//   text: '  Write node.js code   '
// });
// testTodo.save().then((doc) => {
//   console.log('Saved todo:', JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log('Unable to save todo:', error);
// });

// const newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo:', JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log('Unable to save todo:', error);
// });

// const aFullToDo = new Todo({
//   text: 'Walk the dog',
//   completed: false,
//   completedAt: 12345
// });

// aFullToDo.save().then((doc) => {
//   console.log('Saved todo:', JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log('Unable to save todo:', error);  
// });

// User
const User = mongoose.model('User', {
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1    
  }
});

const user = new User({
  // email: '',
  // email: '     brian.hunley@gmail.com    ',
  email: 'brian.hunley@gmail.com',
});
user.save().then((doc) => {
  console.log('User saved:', JSON.stringify(doc, undefined, 2));
}, (error) => {
  console.log('Unable to save user:', error);
});

