import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  showErrMsg,
  showSuccessMsg,
} from '../utils/notifications/Notification';

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const activationEmail = async () => {
      if (activation_token) {
        try {
          const res = await axios.post('/user/activation', {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (error) {
          error.response.token.msg && setErr(error.response.token.msg);
        }
      }
    };
    activationEmail();
  }, [activation_token]);

  return (
    <div className="activate_page">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
};

export default ActivationEmail;
