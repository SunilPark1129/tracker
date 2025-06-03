import React, { useRef } from "react";
import "./styles/submitTask.style.css";
import { fetchCreateTodo } from "../features/todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SubmitTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current.value.trim() === "") return;
    if (!user) return navigate("/login");
    const { value } = inputRef.current;
    const payload = { title: value, hasCompleted: false };

    dispatch(fetchCreateTodo(payload));

    inputRef.current.value = "";
  };

  return (
    <div className="todo__input-box">
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>submit</button>
    </div>
  );
}

export default SubmitTask;
