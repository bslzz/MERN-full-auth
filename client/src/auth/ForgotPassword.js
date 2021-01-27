import axios from 'axios';
import React, { useState } from 'react';
import {
  showErrMsg,
  showSuccessMsg,
} from '../utils/notifications/Notification';
import { isEmail } from '../utils/validation/Validation';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: '',
    err: '',
    success: '',
  });

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value, err: '', success: '' });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: 'Invalid email', success: '' });
    try {
      const res = await axios.post('/user/forgot', { email });
      return setData({ email: '', err: '', success: res.data.msg });
    } catch (error) {
      error.response.data.msg &&
        setData({ ...data, err: error.response.data.msg, success: '' });
    }
  };
  return (
    <div className="fg_pass">
      <h2>Forgot Your Password?</h2>
      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <button onClick={forgotPassword}>Verify your email</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
