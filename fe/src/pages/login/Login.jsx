import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLogin, resetError } from "../../features/user/userSlice";
import "./login.style.css";
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      // reset error when unmounted
      dispatch(resetError());
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { userId, password } = e.target;
    const payload = {
      userId: userId.value,
      password: password.value,
    };
    dispatch(fetchLogin(payload));
  }

  return (
    <main className="login">
      <div className="wrapper">
        <div className="login__container">
          <h1>Log-in</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                id="userId"
                autoComplete="off"
                placeholder="enter username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder="enter password"
                required
              />
            </label>
            <button className="login__btn" type="submit">
              Login
            </button>
          </form>
          {error && <div className="login__error">{error}</div>}
          <div className="login__register">
            <div>You have no account yet?</div>
            <Link to={"/register"}>Click here to sign up</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
