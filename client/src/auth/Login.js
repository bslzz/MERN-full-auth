import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  showErrMsg,
  showSuccessMsg,
} from '../utils/notifications/Notification';
import { useDispatch } from 'react-redux';
import { dispatchLogin } from '../redux/actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: '',
    err: '',
    success: '',
  });

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, err: '', success: '' });
  };

  const handlleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password });
      setUser({ ...user, err: '', success: res.data.msg });
      localStorage.setItem('firstLogin', true);
      dispatch(dispatchLogin());
      history.push('/');
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' });
    }
  };

  return (
    <div className="login_page">
      <h2>Login</h2>
      {err && showErrMsg(err)} {success && showSuccessMsg(success)}
      <form onSubmit={handlleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter your email"
            id="email"
            value={email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
      </form>
      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
