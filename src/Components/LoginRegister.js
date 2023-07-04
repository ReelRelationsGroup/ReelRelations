import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attemptLogin } from "../store";
import { addUserProfile } from "../store/user.js";
import { GithubIcon } from "lucide-react";

const LoginRegister = (props) => {
  const handleLoginFromCheckout = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials)).then((result) => {
      if (result.payload.id) {
        navigate("/");
      }
    });
  };

  const register = async (ev) => {
    ev.preventDefault();
    await dispatch(addUserProfile({ username, password, permissions: false }));
    credentials.username = username;
    credentials.password = password;
    dispatch(attemptLogin(credentials));
    setUsername("");
    setPassword("");
    handleLoginFromCheckout;
    navigate("/");
  };

  const handleGitHubLogin = () => {
    window.location.href = "/api/auth/oauth/github";
  };

  return (
    <div className="loginRegister mx-6">
      <div className="loginRegisterBox">
        <h2>Returning Users</h2>
        <hr className="formDivider" />
        <form onSubmit={login}>
          {auth.error === true && (
            <div>
              <p>Invalid Username And/Or Password!</p>
            </div>
          )}
          <div className="inputContainer">
            <input
              placeholder="username"
              value={credentials.username}
              name="username"
              onChange={onChange}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <button className="my-4 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
              Login
            </button>
            <div>
              <button
                type="button"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                onClick={handleGitHubLogin}
              >
                <GithubIcon className="inline-block mr-2" /> GitHub
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="loginRegisterBox">
        <h2>New Users</h2>
        <hr className="formDivider" />
        <form onSubmit={register}>
          <div className="inputContainer">
            <input
              placeholder="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
              No Account? Register Here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
