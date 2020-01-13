const express = require("express");
const app = express();

app.use(express.json())

const todos = [
  {
    id: 1,
    done: true,
    description: "teste"
  },
  {
    id: 2,
    done: false,
    description: "teste"
  },
  {
    id: 3,
    done: false,
    description: "teste"
  },
  {
    id: 4,
    done: true,
    description: "teste"
  }
];

app.use(function(req, res, next) {
  // run for any & all requests
  console.log("Connection to the API.."); // set up logging for every API call
  next(); // ..to the next routes from here..
});

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  // console.log(req.body)
  const todo = {
    id: todos.length + 1,
    description: req.body.description,
    done: req.body.done
  }

  todos.push(todo)
  res.send(todo)
})

app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("todo not found");
  res.send(todo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("todo not found");

  todo.description = req.body.description
  todo.done = req.body.done
  
  res.send(todo);
});

module.exports = app;
