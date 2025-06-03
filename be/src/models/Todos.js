const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;

// object example
// {
//     "_id": {ref: User},
//     "title": "learn about hooks",
//     "hasCompleted": true,
//     "createdAt": "2025-06-02T15:28:22.387Z",
//     "updatedAt": "2025-06-02T15:28:22.387Z"
// }

const todoItemSchema = new Schema(
  {
    title: { type: String, required: true },
    hasCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const todosSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    data: [todoItemSchema],
  },
  { timestamps: true }
);

// todosSchema.methods.toJSON = function () {
//     const obj = this._doc;
// }

const Todos = mongoose.model("Todos", todosSchema);

module.exports = Todos;
