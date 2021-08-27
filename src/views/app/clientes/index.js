import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const ListCliente = React.lazy(() => import('./list'));

const Form = React.lazy(() => import('./form'));


const Usuarios = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <ListCliente {...props} />}
      />
      <Route
        path={`${match.url}/form/:id?`}
        render={(props) => <Form {...props} />}
      />


      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Usuarios;
