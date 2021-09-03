/* eslint-disable import/named */
import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
 import { ProtectedRoute, UserRole } from '../../helpers/authHelper';


const Perfil = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './meu-perfil')
);
const Agendamento = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './agendamentos')
);
const Colaborador = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './colaboradores')
);
const Clientes = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './clientes')
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './dashboard')
);
const Servico = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './servicos')
);
const Relatorio = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './relatorios')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/agendamentos`} />

            <Route
              path={`${match.url}/meu-perfil`}
              render={(props) => <Perfil {...props} />}
              roles={1} // funcao sistema
            />
            <ProtectedRoute
              path={`${match.url}/agendamentos`}
              component={Agendamento}
              roles={1} // modulo agendamentos   
            />
            <ProtectedRoute
              path={`${match.url}/colaboradores`}
              component={Colaborador}
              roles={4}  // modulo colaboradores 
            />
            <ProtectedRoute
              path={`${match.url}/clientes`}
              component={Clientes}
              roles={5} // modulo clientes 
            />
            <ProtectedRoute
              path={`${match.url}/dashboard`}
              component={Dashboard}
              roles={6} // modulo dashboard 
            />
            <ProtectedRoute
              path={`${match.url}/servicos`}
              component={Servico}
              roles={7} // modulo servicos 
            />
            <ProtectedRoute
              path={`${match.url}/relatorios`}
              component={Relatorio}
              roles={11} // modulo relatorio 
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
