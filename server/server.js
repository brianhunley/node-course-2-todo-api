require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// POST /todos - add a new todo
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos - get all todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/123412341234 - get a todo by id
app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  // check if todo has a validate id using isValid
  if (!ObjectID.isValid(id)) {
    // todo id is not valid, send back a 404 with an empty body
    return res.status(404).send();
  }

  // findById
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    // check if a todo was found
    if (!todo) {
      // if a todo was not found, send a 404 with an empty body
      return res.status(404).send();
    }

    // a todo was found, so send a 200 with the todo in the body
    res.status(200).send({todo});
  }).catch((err) => {
    res.status(400).send(); // error on findById function
  });
});

// DELETE /todos/123123123 - delete a todo by id
  // remove todo by id
  //   success
  //     if no doc, send 404
  //     if doc, send doc back with a 200
  //   error - send 400 with an empty body
// app.delete('/todos/:id', authenticate, (req, res) => {
//   // get the id
//   const id = req.params.id;

//   // validate the id -> not valid? return 404
//   if (!ObjectID.isValid(id)) {
//     // todo id is not valid, send back a 404 with an empty body
//     return res.status(404).send();
//   }

//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id
//   }).then((todo) => {
//     // check if no todo was return, showing it was removed
//     if (!todo) {
//       return res.status(404).send();
//     }

//     // a todo was found, so send a 200 with the todo in the body
//     res.status(200).send({todo});
//   }).catch((err) => {
//     res.status(400).send(); // error on findByIdAndRemove function
//   });
// });

// updated function above using async/await
// TODO - convert to async/await
app.delete('/todos/:id', authenticate, async (req, res) => {
  // get the id
  const id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    // todo id is not valid, send back a 404 with an empty body
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });

    // check if no todo was return, showing it was removed
    if (!todo) {
      return res.status(404).send();
    }    
    
    res.status(200).send({todo});
  } catch (err) {
    res.status(400).send();
  };
});

// PATCH HTTP method to do document updates - update a todo by id
app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    // todo id is not valid, send back a 404 with an empty body
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  } 

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, { $set: body }, { new: true }
  ).then((todo) => {
    // check if no todo was return, showing it was removed
    if (!todo) {
      return res.status(404).send();
    }

    // a todo was found, so send a 200 with the todo in the body
    res.status(200).send({todo});    
  }).catch((err) => {
    res.status(400).send();
  });  
});

// POST /users - add a new user
//    most similar to the POST /todos function
//    use "pick" for getting the parameters off the body
//      just email and password are the only two fields posted
// app.post('/users', (req, res) => {
//   const body = _.pick(req.body, ['email', 'password']);
//   const user = new User(body);
//   // use above line instead of this.  the body object is already created!
//   // const user = new User({
//   //   email: body.email,
//   //   password: body.password
//   // });

//   user.save().then(() => {
//     return user.generateAuthToken();
//   }).then((token) => {
//     res.header('x-auth', token).send(user);
//   }).catch((err) => {
//     res.status(400).send(err);
//   }); 
// });

// updated function above using async/await
// TODO - convert to async/await
app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
  
    await user.save();
    const token = await user.generateAuthToken();

    res.header('x-auth', token).send(user);  
  } catch(err) {
    res.status(400).send(err);
  };
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
// app.post('/users/login', (req, res) => {
//   const body = _.pick(req.body, ['email', 'password']);
  
//   User.findByCredentials(body.email, body.password).then((user) => {    
//     return user.generateAuthToken().then((token) => {
//       res.header('x-auth', token).send(user);
//     });
//   }).catch((err) => {
//     res.status(400).send();
//   });
// });

// updated function above using async/await
app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();  
    res.header('x-auth', token).send(user);  
  } catch (err) {
    res.status(400).send();
  };
});

// app.delete('/users/me/token', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send();
//   }, () => {
//     res.status(400).send();
//   });
// });

// updated function above using async/await
app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send(); 
  } catch (err) {
    res.status(400).send();
  };
});

// start web server listening on specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };