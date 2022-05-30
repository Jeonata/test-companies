import React from 'react';
import { Switch } from 'react-router-dom';

import { Companies } from 'pages/Companies';
import { Dashboard } from 'pages/Dashboard';
import { Numbers } from 'pages/Numbers';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/company/:companyId" exact component={Companies} />
    <Route path="/number/:numberId" exact component={Numbers} />
  </Switch>
);

export default Routes;
