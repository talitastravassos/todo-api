const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const morgan = require("morgan");
const Todo = require("../schemas/todo");

// const todos = [
//   {
//     id: 1,
//     done: true,
//     description: "teste"
//   },
//   {
//     id: 2,
//     done: false,
//     description: "teste"
//   },
//   {
//     id: 3,
//     done: false,
//     description: "teste"
//   },
//   {
//     id: 4,
//     done: true,
//     description: "teste"
//   }
// ];

router.use(express.json());
router.use(morgan("tiny"));

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.send(todos);
  } catch (error) {
    console.log(error);
  }
});

router.post("/todos", async (req, res) => {
  const todo = new Todo({
    description: req.body.description
  });

  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const resultMongoDB = await todo.save();
  res.send(resultMongoDB);
});

router.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    res.send(todo);
  } catch (error) {
    res.status(404).send(error);

    console.log(error);
  }
});

router.put("/todos/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  try {
    const todo = await Todo.findById(req.params.id);

    todo.description = req.body.description;
    todo.done = req.body.done;

    const resultMongoUpdate = await todo.save();

    res.send(resultMongoUpdate);
  } catch (error) {
    return res.status(404).send(error);
  }
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
    done: Joi.boolean(),
    date: Joi.date()
  });

  return schema.validate(body);
}

module.exports = router;
