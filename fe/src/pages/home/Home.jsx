import React, { useEffect } from "react";
import "./home.style.css";
import SubmitTask from "../../components/SubmitTask";
import Board from "../../components/Board";
import { fetchGetTodos } from "../../features/todos/todosSlice";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchGetTodos());
  }, []);

  let instructionText = null;

  if (!user) instructionText = "Login to plan your day";
  else if (todos.length === 0) instructionText = "Enter your first plan";

  return (
    <main className="todo">
      <div className="wrapper">
        <div className="todo__container">
          <h1>ToDoList</h1>
          {isLoading && <Loading />}
          <SubmitTask />
          {instructionText && <span>{instructionText}</span>}
          {todos.length !== 0 && <Board />}
        </div>
      </div>
    </main>
  );
}

export default Home;
