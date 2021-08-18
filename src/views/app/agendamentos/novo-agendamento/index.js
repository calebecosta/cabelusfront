/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, Suspense } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../../../components/common/react-notifications';

import { loginUser } from '../../../../redux/actions';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import UserLayout from '../../../../layout/UserLayout';
import {setCurrentUser , alert } from '../../../../helpers/Utils';
import Layouts from '../../../../containers/agendamento/Layouts';

import api from '../../../../services/api';

const Login = () => {
  const [login] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [nome, setNomeCliente] = useState('');
  const [email, setEmailCliente] = useState('');
  const [endereco, setEndereco] = useState('');
  const [Oldpassword, setOldPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

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
    const agendamento = {
      colaborador_id : "",
      observacao : "",
      servico_id: "",
      data: "",
    };
    localStorage.setItem("agendamento",JSON.stringify(agendamento));
  }, []);


  const setStorage = (data) => {
    setCurrentUser(data.usuario);
    localStorage.setItem('@cabelus/token', data.token);
    localStorage.setItem('@cabelus/tipo_usuario', data.tipo_usuario);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
  };

   const onUserCadastro = () => {
    const obj = {
      nome,
      endereco,
      email,
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
                setTimeout(() => {
                  window.location = './app/agendamentos/form';   
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
  };


  const initialValues = { login, password };

  return (
    <>
    <Layouts/>
   </>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { error } = authUser;
  return { error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
