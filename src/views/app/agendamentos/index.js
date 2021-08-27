import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const ListAgendamento = React.lazy(() => import('./list'));

const Form = React.lazy(() => import('./form'));
const Calendario = React.lazy(() => import('./calendario'));
const NovoAgendamento = React.lazy(() => import('./novo-agendamento'));

const Usuarios = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <ListAgendamento {...props} />}
      />
      <Route
        path={`${match.url}/form/:id?`}
        render={(props) => <Form {...props} />}
      />
      <Route
        path={`${match.url}/calendario`}
        render={(props) => <Calendario {...props} />}
      />
      <Route
        path={`${match.url}/novo-agendamento`}
        render={(props) => <NovoAgendamento {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Usuarios;
