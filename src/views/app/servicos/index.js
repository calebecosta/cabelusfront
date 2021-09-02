import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FormServicos = React.lazy(() => import('./form'));
const ListServicos = React.lazy(() => import('./list'));


const Servicos = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <ListServicos {...props} />}
      />
      <Route
        path={`${match.url}/form/:id?`}
        render={(props) => <FormServicos {...props} />}
      />
    </Switch>
  </Suspense>
);
export default Servicos;
