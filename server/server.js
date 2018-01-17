require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// POST /todos - add a new todo
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos - get all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/123412341234 - get a todo by id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  // check if todo has a validate id using isValid
  if (!ObjectID.isValid(id)) {
    // todo id is not valid, send back a 404 with an empty body
    return res.status(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
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
app.delete('/todos/:id', (req, res) => {
  // get the id
  const id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    // todo id is not valid, send back a 404 with an empty body
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    // check if no todo was return, showing it was removed
    if (!todo) {
      return res.status(404).send();
    }

    // a todo was found, so send a 200 with the todo in the body
    res.status(200).send({todo});
  }).catch((err) => {
    res.status(400).send(); // error on findByIdAndRemove function
  });
});

// PATCH HTTP method to do document updates - update a todo by id
app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }
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
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);  
  const user = new User(body);
  // use above line instead of this.  the body object is already created!
  // const user = new User({
  //   email: body.email,
  //   password: body.password
  // });

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  }); 
});

// start web server listening on specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };