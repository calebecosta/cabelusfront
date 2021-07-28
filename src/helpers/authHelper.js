/* eslint-disable import/no-cycle */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from './Utils';
import { isAuthGuardActive } from '../constants/defaultValues';

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const permissoes = [];
        if (currentUser.grupo) {
          currentUser.grupo.funcoes.forEach((permissao) => {
            permissoes.push(permissao.id);
          });
        }
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};
const UserRole = {
  Admin: 0,
  Editor: 1,
};

export { ProtectedRoute, UserRole };
