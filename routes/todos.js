const express = require("express");
const router = express.Router();

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

router.use(function(req, res, next) {
  // run for any & all requests
  console.log("Connection to the API.."); // set up logging for every API call
  next(); // ..to the next routes from here..
});

router.route("/todos").get((req, res) => {
  res.send(todos);
});

router.route("/todos/:id").get((req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("not found");
  res.send(todo);
});

module.exports = router;
