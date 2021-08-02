import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';


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
            />
            <Route
              path={`${match.url}/agendamentos`}
              render={(props) => <Agendamento {...props} />}
            />
            <Route
              path={`${match.url}/colaboradores`}
              render={(props) => <Colaborador {...props} />}
            />
            <Route
              path={`${match.url}/clientes`}
              render={(props) => <Clientes {...props} />}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/servicos`}
              render={(props) => <Servico {...props} />}
            />
        
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
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
