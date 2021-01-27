import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ActivationEmail from '../../auth/ActivationEmail';
import ForgotPassword from '../../auth/ForgotPassword';
import Login from '../../auth/Login';
import Register from '../../auth/Register';
import NotFound from '../NotFound/NotFound';

const Body = () => {
  const auth = useSelector((state) => state.auth);
  const { isLoggedin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/login" component={isLoggedin ? NotFound : Login} />
        <Route path="/register" component={isLoggedin ? NotFound : Register} />
        <Route
          path="/forgot_password"
          component={isLoggedin ? NotFound : ForgotPassword}
        />
        <Route
          path="/user/activation/:activation_token"
          component={ActivationEmail}
        />
      </Switch>
    </section>
  );
};

export default Body;
