/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
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
import {setCurrentUser , alert } from '../../helpers/Utils';


import api from '../../services/api';

const Login = () => {
  const [login] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [nome, setNomeCliente] = useState('');
  const [email, setEmailCliente] = useState('');
  const [endereco, setEndereco] = useState('');


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
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "E-mail inválido";
    }else
    setEmailCliente(value)
    
    return error;
  };


  const validateNome = (value) => {
    let error;
    if (!value) {
      error = "Por favor, preencha o campo Nome";
    }else
    setNomeCliente(value)
    
    return error;
  };


  const validateEndereco = (value) => {
    let error;
    if (!value) {
      error = "Por favor, preencha o campo Endereço";
    }else
    setEndereco(value)

    return error;
  };

  const setStorage = (data) => {
    setCurrentUser(data.usuario);
    localStorage.setItem('@cabelus/token', data.token);
    localStorage.setItem('@cabelus/tipo_usuario', data.tipo_usuario);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
  };

  const onUserCadastro = async (values) => {
    if (!loading) {
      if (values.email !== "") {
    const obj = {
      nome : nome,
      endereco : endereco,
      email : email,
      senha: password,
    };
  
    setLoading(true);
    try {
      api.post(`/cliente/`, obj).then((response) => {
        const { error } = response.data;
        if (error === undefined) {
          alert('Cadastrado efetivado com sucesso!', 2000, 'success');
           api.post(`/session`, {
            email,
            senha:password,
          })
          .then((data) => {
             console.log(">>>",data);
            if (data.data.error === undefined) {
              setLoading(false);
              setStorage(data.data);
              if (data.data.usuario && data.data.usuario.id) {

                data.data.usuario.grupo = { id : ''};

                data.data.usuario.grupo.id = 0;
                data.data.usuario.grupo.nome = "Cliente";
                data.data.usuario.grupo.funcoes =[ { id : "" , nome : ""},{ id : "" , nome : ""}];

                data.data.usuario.grupo.funcoes[0].id = 9;
                data.data.usuario.grupo.funcoes[0].nome = "Cliente ( Função meu perfil)";

                data.data.usuario.grupo.funcoes[1].id = 1;
                data.data.usuario.grupo.funcoes[1].nome = "Acesso ao sistema";

                setStorage(data.data);

                setTimeout(() => {
                  window.location = './app/agendamentos/novo-agendamento';   
                }, 3000); 
              }
            } else {
              communicate(data.data.error, 3000, 'danger');
            }
            setLoading(false);
          });
        } else {
            setLoading(false);
          alert(response.data.error, 3000, 'danger');
        }
      });
    } catch (error) {
      alert('Ops... Estamos passando por uma instabilidade..', 3000, 'danger');
      }
    }
  }
};



  const initialValues = { nome,email,endereco,login, password };

  return (
    <UserLayout>
      <Suspense>
        <Row className="h-100">
          <Colxx xxs="11" md="8" className="mx-auto my-auto">
            <Card className="auth-card-cadastro">
            
              <div className="form-side-cadastro">
                <NavLink to="/" className="white"/>
                <h1>CABELUS</h1>
              

                <CardTitle className="mb-4">
                  <IntlMessages id="user.cadastro" />
                </CardTitle>
                <Formik initialValues={initialValues} onSubmit={onUserCadastro}>
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.nome" />
                        </Label>
                        <Field
                          className="form-control"
                          name="nome"
                          validate={validateNome}
                        />
                         {errors.nome && touched.nome && (
                          <div className="invalid-feedback d-block">
                            {errors.nome}
                          </div>
                        )}
                      </FormGroup>
                    
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.email" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="email"
                          validate={validateEmail}
                        />
                         {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                        
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.endereco" />
                        </Label>
                        <Field
                          className="form-control"
                          type="text"
                          name="endereco"
                          validate={validateEndereco}
                        />
                         {errors.endereco && touched.endereco && (
                          <div className="invalid-feedback d-block">
                            {errors.endereco}
                          </div>
                        )}

                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.new-password" />
                        </Label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"

                        />
                       
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.new-password-again" />
                        </Label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password_again"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup>
                      
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to="/esqueceu-senha" />
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
                            <IntlMessages id="user.cadastrar" />
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
