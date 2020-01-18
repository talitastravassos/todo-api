# Todos API
- Todos API build with nodejs, express and mongodb
- https://tst-todosapi.herokuapp.com/api

## Endpoints
- Get a list of todos [GET]  

    `https://tst-todosapi.herokuapp.com/api/todos`

- Get a todo by id [GET]  

    `https://tst-todosapi.herokuapp.com/api/todos/{todo_id}`
    
- Create a new todo [POST]

    `https://tst-todosapi.herokuapp.com/api/todos`

  **Body:**
  ```
  {
     "description": "todo description"
  }
  ```
    
- Update a todo [PUT]  

    `https://tst-todosapi.herokuapp.com/api/todos/{todo_id}`
    
  **Body:**
  ```
  {
      "description": "todo new description",
      "done": true // bool
  }
  ```    

- Delete a todo by id [DELETE]  

    `https://tst-todosapi.herokuapp.com/api/todos/{todo_id}`
    
- Delete all done todos [DELETE]  

    `https://tst-todosapi.herokuapp.com/api/todos`    
