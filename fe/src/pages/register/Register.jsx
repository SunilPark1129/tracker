import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister, resetError } from "../../features/user/userSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      // reset error when unmounted
      dispatch(resetError());
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { userId, password, confirm_password } = e.target;
    if (password.value !== confirm_password.value) {
      setError("Password and Confirm-password must match.");
      return;
    }

    const payload = {
      userId: userId.value,
      password: password.value,
    };

    try {
      await dispatch(fetchRegister(payload)).unwrap();
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <main className="login">
      <div className="wrapper">
        <div className="login__container">
          <h1>Sign-up</h1>
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
            <label>
              Confirm-Password
              <input
                type="password"
                id="confirm_password"
                autoComplete="off"
                placeholder="enter confirm-password"
                required
              />
            </label>
            <button className="login__btn" type="submit">
              Sign up
            </button>
          </form>
          {error && <div className="login__error">{error}</div>}
          <div className="login__register">
            <div>You already have an account?</div>
            <Link to={"/login"}>Click here to login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
