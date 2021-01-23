import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  showErrMsg,
  showSuccessMsg,
} from '../utils/notifications/Notification';

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: '',
  });

  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, err: '', success: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/register', { name, email, password });
      setUser({ ...user, err: '', success: res.data.msg });

      history.push('/');
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' });
    }
  };

  return (
    <div className="login_page">
      <h2>Register</h2>
      {err && showErrMsg(err)} {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={name}
            name="name"
            onChange={handleChangeInput}
          />
        </div>
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
        <div>
          <label htmlFor="cf_password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            id="cf_password"
            value={cf_password}
            name="cf_password"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
