const Todos = require("../models/Todos");
const {
  getTodosByUserId,
  addTodoToUser,
  updateTodoToUser,
  deleteTodoToUser,
} = require("../repository/todoRepo");

const todosController = {};

todosController.getTodos = async (req, res) => {
  try {
    const { userId } = req;
    const todos = await getTodosByUserId(userId);
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error code 500: Cannot get todo items" });
  }
};

todosController.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req;
    const newTodo = { title };

    const todosDoc = await getTodosByUserId(userId);
    const addedTodo = await addTodoToUser(todosDoc, newTodo);

    res.status(201).json({ success: true, data: addedTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error code 500: Cannot create todo item.",
    });
  }
};

todosController.updateTodo = async (req, res) => {
  try {
    const { title, hasCompleted } = req.body;
    const { id } = req.params;
    const { userId } = req;

    const updatedData = await updateTodoToUser(userId, id, {
      title,
      hasCompleted,
    });

    res.status(200).json({ success: true, data: updatedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error code 500: Cannot update todo item." });
  }
};

todosController.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    await deleteTodoToUser(userId, id);

    res.status(200).json({ success: true, data: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error code 500: Cannot delete todo item." });
  }
};

module.exports = todosController;
