const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/123412341234
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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = { app };