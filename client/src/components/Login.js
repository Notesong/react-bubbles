import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Login({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState('');

  const formReset = () => {
    showLoader(false);
    setUsername('');
    setPassword('');
  }

  const onSubmit = e => {
    e.preventDefault();
    
    setError('');
    showLoader(true);

    axiosWithAuth()
      .post("/login", { username: username, password: password })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        formReset();
        history.push('/protected');
      })
      .catch(err => {
        setError('Incorrect username or password.');
        localStorage.removeItem("token");
        formReset();
      });
  };

  return (
    <div className="login">
      {localStorage.getItem("token") ? <Redirect to="/protected"/> : ''}
      <h1>Welcome to the Bubble App!</h1>
      <div className="login-container">
        <form className="form" onSubmit={onSubmit}>
          {error && <p className="error">{error}</p>}
          <p>Login</p>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="password"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
          <button className="submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p>Lambda School</p>
        <p>i&lt;3Lambd4</p>
      </div>
    </div>
  );
}
