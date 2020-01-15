const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const morgan = require("morgan");

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

router.use(express.json());
router.use(morgan("tiny"));

router.get("/todos", (req, res) => {
  res.send(todos);
});

router.post("/todos", (req, res) => {
  const todo = {
    id: todos.length + 1,
    description: req.body.description,
    done: req.body.done
  };

  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  todos.push(todo);
  res.send(todo);
});

router.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("todo not found");
  res.send(todo);
});

router.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("todo not found");

  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  todo.description = req.body.description;
  todo.done = req.body.done;

  res.send(todo);
});

router.delete("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("todo not found");

  const index = todos.indexOf(todo);
  todos.splice(index, 1);

  res.send(todo);
});

function validate(body) {
  const schema = Joi.object({
    description: Joi.string()
      .min(5)
      .required(),
    done: Joi.boolean().required()
  });

  return schema.validate(body);
}

module.exports = router;
