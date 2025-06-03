const { Router } = require("express");
const todosController = require("../controllers/todos.controller");

const router = Router();

router.get("/", todosController.getTodos);

router.post("/", todosController.createTodo);

router.put("/:id", todosController.updateTodo);

router.delete("/:id", todosController.deleteTodo);

module.exports = router;
