import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ActivationEmail from '../../auth/ActivationEmail';
import Login from '../../auth/Login';
import Register from '../../auth/Register';
import NotFound from '../NotFound/NotFound';

const Body = () => {
  const auth = useSelector((state) => state.auth);
  const { isLoggedin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/login" exact component={isLoggedin ? NotFound : Login} />
        <Route
          path="/register"
          exact
          component={isLoggedin ? NotFound : Register}
        />
        <Route
          path="/user/activation/:activation_token"
          exact
          component={ActivationEmail}
        />
      </Switch>
    </section>
  );
};

export default Body;
