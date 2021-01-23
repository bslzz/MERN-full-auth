import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../auth/Login';
import Register from '../../auth/Register';

const Body = () => {
  return (
    <section>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </section>
  );
};

export default Body;
