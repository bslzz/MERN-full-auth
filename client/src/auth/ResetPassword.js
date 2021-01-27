import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  showErrMsg,
  showSuccessMsg,
} from '../utils/notifications/Notification';
import { isEmpty, isLength, isMatch } from '../utils/validation/Validation';

const ResetPassword = () => {
  const { token } = useParams();

  const [data, setData] = useState({
    password: '',
    cf_password: '',
    err: '',
    success: '',
  });

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value, err: '', success: '' });
  };

  const resetPassword = async () => {
    if (isEmpty(password))
      return setData({
        ...data,
        err: 'Please fill in all fields.',
        success: '',
      });
    if (isLength(password))
      return setData({
        ...data,
        err: 'Password must be at least 6 characters long',
        success: '',
      });
    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: 'Password not matched',
        success: '',
      });
    try {
      const res = await axios.post(
        '/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );
      return setData({
        password: '',
        cf_password: '',
        err: '',
        success: res.data.msg,
      });
    } catch (error) {
      error.response.data.msg &&
        setData({ ...data, err: error.response.data.msg, success: '' });
    }
  };

  return (
    <div className="fg_pass">
      <h2>Reset Your Password?</h2>
      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangeInput}
        />
        <label htmlFor="cf_password">Confirm Password</label>
        <input
          type="password"
          name="cf_password"
          id="cf_password"
          value={cf_password}
          onChange={handleChangeInput}
        />
        <button onClick={resetPassword}>Reset your password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
