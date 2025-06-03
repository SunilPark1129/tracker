const Todos = require("../models/Todos");

exports.getTodosByUserId = async (userId) => {
  return await Todos.findOne({ userId });
};

exports.addTodoToUser = async (todosDoc, newTodo) => {
  todosDoc.data.push(newTodo);
  await todosDoc.save();
  return todosDoc.data[todosDoc.data.length - 1];
};

exports.updateTodoToUser = async (userId, id, { title, hasCompleted }) => {
  const todosDoc = await Todos.findOne({ userId });
  const todoData = todosDoc.data.id(id);
  if (!todoData) {
    return res
      .status(404)
      .json({ error: `Error code 500: Cannot find id ${id}` });
  }

  todoData.title = title ?? todoData.title;
  todoData.hasCompleted = hasCompleted ?? todoData.hasCompleted;
  await todosDoc.save();
  return todoData;
};

exports.deleteTodoToUser = async (userId, id) => {
  const todosDoc = await Todos.findOne({ userId });
  const todoData = todosDoc.data.id(id);
  if (!todoData) {
    return res
      .status(404)
      .json({ error: `Error code 500: Cannot find id ${id}` });
  }
  todosDoc.data = todosDoc.data.filter((item) => item._id.toString() !== id);
  await todosDoc.save();
};
