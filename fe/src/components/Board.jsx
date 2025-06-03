import { useMemo } from "react";
import "./styles/board.style.css";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

function Board() {
  const { todos } = useSelector((state) => state.todos);

  const tasks = useMemo(() => {
    const pendingTasks = todos.filter((item) => !item.hasCompleted);
    const completedTasks = todos.filter((item) => item.hasCompleted);
    return [
      { task: pendingTasks, label: "Pending Tasks" },
      { task: completedTasks, label: "Completed Tasks" },
    ];
  }, [todos]);

  return (
    <div className="board">
      {tasks.map(({ task, label }) => (
        <section key={label} className="board__content">
          <h2>{label}</h2>
          <ul>
            {task.map((item) => (
              <TodoItem key={item._id} item={item} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Board;
