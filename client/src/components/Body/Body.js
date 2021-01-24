import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ActivationEmail from '../../auth/ActivationEmail';
import Login from '../../auth/Login';
import Register from '../../auth/Register';

const Body = () => {
  return (
    <section>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/user/activation/:activation_token"
          component={ActivationEmail}
        />
      </Switch>
    </section>
  );
};

export default Body;
