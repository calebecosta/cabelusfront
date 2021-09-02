import React, { Suspense } from 'react';
import { Redirect, Switch,Route } from 'react-router-dom';
import { ProtectedRoute } from '../../../helpers/authHelper';

const ListAgendamento = React.lazy(() => import('./list'));

const Form = React.lazy(() => import('./form'));
const Calendario = React.lazy(() => import('./calendario'));
const NovoAgendamento = React.lazy(() => import('./novo-agendamento'));

const Usuarios = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <ProtectedRoute
        path={`${match.url}/list`}
        component={ListAgendamento}
        render={(props) => <ListAgendamento {...props} />}
      />
      <Route
        path={`${match.url}/form/:id?`}
        component={Form}
        render={(props) => <Form {...props} />}
      />
      <ProtectedRoute
        path={`${match.url}/calendario`}
        component={Calendario}
        roles={5}
      />
      <Route
        path={`${match.url}/novo-agendamento`}
        component={NovoAgendamento}
        render={(props) => <NovoAgendamento {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Usuarios;
