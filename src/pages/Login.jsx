import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = (props) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.sendRequest(e.target.value)

    const loginInfo = {
      username,
      password,
    };

    dispatch(login(loginInfo))
      .unwrap()
      .then((user) => {
        console.log("logged in" + user.username);
        localStorage.setItem("user", JSON.stringify(user));
        toast(`Logged in as ${user.username}`, {
          type: "success",
          autoClose: 1500,
          position: "top-center",
        });

        navigate("/home");
      })
      .catch(toast.error);
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="title">Login</div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="username"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
          <p onClick={onRegister}>Don't have an account? Register here.</p>
        </form>
      </section>
    </>
  );
};

export default Login;
