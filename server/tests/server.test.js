const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send( {text} )
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
         return done(err);
        }

        Todo.find({ text: 'Test todo text' }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send( {} )
      .expect(400)
      .end((err, res) => {
        if (err) {
         return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((err) => done(err));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    const newId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if the object id is invalid', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    const testId = todos[1]._id.toHexString();
    
    request(app)
      .delete(`/todos/${testId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(testId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // query database using findById - is should fail, since it was deleted
        // use the toNotExist assurtion
        Todo.findById(testId).then((todo) => {
          expect(todo).toBeNull();
          done();
        }).catch((err) => done(err));
      });
  });

  it('should return a 404 if todo not found', (done) => {
    const newId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if the object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo', (done) => {
    // grab id of first item
    // update text, set completed to true
    // assert 200 back
    // one custom assertion
    //    text is changed, completed is true, completedAt is a number (use .toBeANumber)

    const testTodo = todos[0];
    const testId = testTodo._id.toHexString(); 
    const newText = 'This should be the new text';   

    request(app)
      .patch(`/todos/${testId}`)
      .send({
        text: newText,
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(true);
        // expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    // grab id of second todo item
    // update text, set completed to false
    // assert 200 back
    // one custom assertion
    //   text is changed, completed is false, completedAt is null (use .toBeNull)

    const testTodo = todos[1];
    const testId = testTodo._id.toHexString(); 
    const newText = 'This should be the new text!!';   

    request(app)
      .patch(`/todos/${testId}`)
      .send({
        text: newText,
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeNull();
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    const newId = new ObjectID().toHexString();

    request(app)
      .patch(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if the object id is invalid', (done) => {
    request(app)
      .patch('/todos/123abc')
      .expect(404)
      .end(done);
  });
});
