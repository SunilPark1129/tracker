import "./styles/navbar.style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLogout } from "../features/user/userSlice";
import { resetTodos } from "../features/todos/todosSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  async function handleLogout() {
    await dispatch(fetchLogout());
    dispatch(resetTodos());
  }

  return (
    <nav>
      <Link className="nav__logo" to={"/"}>
        Spark Todolist
      </Link>
      {!user ? (
        <div className="nav__flex">
          <Link className="nav__btn" to={"/register"}>
            Sign up
          </Link>
          <Link className="nav__btn" to={"/login"}>
            Login
          </Link>
        </div>
      ) : (
        <div className="nav__flex">
          <span>Hello, {user.userId}</span>
          <button className="nav__btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
