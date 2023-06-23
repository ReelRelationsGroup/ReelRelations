import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { attemptLogin } from '../store';
import { addUserProfile } from '../store/user.js';

const LoginRegister = (props) => {
  const handleLoginFromCheckout = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth = useSelector(state => state.auth);
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
      ev.preventDefault();
      dispatch(attemptLogin(credentials)).then((result) => {
        console.log(result.payload.error);
        if (result.payload.error===false) {
          navigate('/');
        }
      });
  };

  const register = async (ev) => {
    ev.preventDefault();
    await dispatch(addUserProfile({ username, password, permissions: false }));
    credentials.username = username;
    credentials.password = password;
    dispatch(attemptLogin(credentials));
    setUsername('');
    setPassword('');
    handleLoginFromCheckout;
    navigate('/');
  };

  return (
    <div className="loginRegister">
      <div className="loginRegisterBox">
        <h2>Returning users</h2>
        <hr className="formDivider" />
        <form onSubmit={login}>
            {auth.error===true && (
              <div>
                <p>Invalid username and/or password!</p>
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
            <button className="loginButton">Login</button>
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
            <button className="registerButton">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
