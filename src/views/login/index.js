import React, { useState, useEffect, Suspense } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import UserLayout from '../../layout/UserLayout';
import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';

import api from '../../services/api';

const Login = () => {
  const [login] = useState('');
  const [password] = useState('');
  const [loading, setLoading] = useState(false);

  const communicate = (text, time, type) => {
    if (type === 'success') {
      NotificationManager.success(
        text,
        'Deu tudo certo!',
        time,
        null,
        null,
        'filled'
      );
    } else {
      NotificationManager.error(text, 'Ops!', time, null, null, 'filled');
    }
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Por favor, preencha o campo E-mail';
    }
    return error;
  };
  useEffect(() => {
    async function getUserApi() {
      const user = getCurrentUser(); // verifico se o usuário está logado
      try {
        const response = await api.get(`/usuario/${user.id}`);

        const { error } = response.data;

        if (error === undefined) {
          if (response.data && response.data.id) {
            setCurrentUser(response.data);
            if (user.grupo) {
              window.location = './app/dashboard';
            }else
            window.location = './app/agendamentos/list';
          }
        } else {
          localStorage.clear();
        }
      } catch (err) {
        localStorage.clear();
      }
    }

    getUserApi();
  }, []);

  const setStorage = (data) => {
    setCurrentUser(data.usuario);
    localStorage.setItem('@cabelus/token', data.token);
    localStorage.setItem('@cabelus/tipo_usuario', data.tipo_usuario);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
  };

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.login !== '' && values.password !== '') {
        setLoading(true);
        api
          .post(`/session`, {
            email: values.login,
            senha: values.password,
          })
          .then((response) => {
             console.log(">>>",response);
            if (response.data.error === undefined) {
              setStorage(response.data);
              if (response.data.usuario && response.data.usuario.id && response.data.usuario.grupo) {
                  window.location = './app/agendamentos';   
              }else{
                response.data.usuario.grupo = { id : ''};

                response.data.usuario.grupo.id = 0;
                response.data.usuario.grupo.nome = "Cliente";
                response.data.usuario.grupo.funcoes =[ { id : "" , nome : ""},{ id : "" , nome : ""}];

                response.data.usuario.grupo.funcoes[0].id = 9;
                response.data.usuario.grupo.funcoes[0].nome = "Cliente (Agendamentos, meu perfil e afins)";

                response.data.usuario.grupo.funcoes[1].id = 1;
                response.data.usuario.grupo.funcoes[1].nome = "Acesso ao sistema";

                setStorage(response.data);
                 window.location = './app/agendamentos/list';
              }
            } else {
              communicate(response.data.error, 3000, 'danger');
            }
            setLoading(false);
          });
      }
    }
  };

  const initialValues = { login, password };

  return (
    <UserLayout>
      <Suspense>
        <Row className="h-100">
          <Colxx xxs="12" md="11" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side ">
                <p className="text-white h2" />
              </div>
              <div className="form-side">
                <NavLink to="/" className="white">
                  <h1 style={{'color':"black", "text-align":"center"}}> CABELUS</h1>
                  {/* <span className="logo-single" /> */}
                </NavLink>

                <CardTitle className="mb-4">
                  <IntlMessages id="user.login-title" />
                </CardTitle>
                <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.login-title" />
                        </Label>
                        <Field
                          className="form-control"
                          name="login"
                          validate={validateEmail}
                        />
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.password" />
                        </Label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )}
                      </FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to="/esqueceu-senha">
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className={`btn-shadow btn-multiple-state ${
                            loading ? 'show-spinner' : ''
                          }`}
                          size="lg"
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="user.login-button" />
                          </span>
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Card>
          </Colxx>
        </Row>
      </Suspense>
    </UserLayout>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { error } = authUser;
  return { error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
