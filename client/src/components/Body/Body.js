import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ActivationEmail from '../../auth/ActivationEmail';
import ForgotPassword from '../../auth/ForgotPassword';
import Login from '../../auth/Login';
import Register from '../../auth/Register';
import ResetPassword from '../../auth/ResetPassword';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import EditUser from '../Profile/EditUser';
import Profile from '../Profile/Profile';

const Body = () => {
  const auth = useSelector((state) => state.auth);
  const { isLoggedin, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={isLoggedin ? NotFound : Login} />
        <Route path="/register" component={isLoggedin ? NotFound : Register} />
        <Route
          path="/forgot_password"
          component={isLoggedin ? NotFound : ForgotPassword}
        />
        <Route
          path="/user/reset/:token"
          component={isLoggedin ? NotFound : ResetPassword}
        />
        <Route
          path="/user/activation/:activation_token"
          component={ActivationEmail}
        />
        <Route path="/profile" component={isLoggedin ? Profile : NotFound} />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
          exact
        />
      </Switch>
    </section>
  );
};

export default Body;
