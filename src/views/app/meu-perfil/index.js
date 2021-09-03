/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  FormGroup,
  Label,
  Button,
  Form,
  CustomInput,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { NotificationManager } from '../../../components/common/react-notifications';

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import {
  Colxx,
  Separator,
} from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import IntlMessages from '../../../helpers/IntlMessages';
import {
  cpfMask,
  phoneMask,
  getCurrentUser,
  setCurrentUser,
} from '../../../helpers/Utils';
import { imgPreview } from '../../../constants/defaultValues';
import api from '../../../services/api';

const FormStand = ({ match, intl }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [msgError, setMsgError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { messages } = intl;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');

  const [email, setEmail] = useState('');
  const [Oldpassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [foto_id, setFotoId] = useState('');
  const [login, setLogin] = useState('');


  const tpuser = localStorage.getItem('@cabelus/tipo_usuario') === 'cli' ? 'cliente' : 'usuario';

  useEffect(() => {
    const usuario = getCurrentUser();
    setId(usuario.id);
  }, []);

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

  async function handleUploadChange(event) {
    try {
      const file = event.target.files;
      const formData = new FormData();
      const config = {
        headers: { 'Content-type': 'multipart/form-data' },
      };
      formData.append(`file`, file[0]);
      formData.append(`tipofile_id`, 9);
      const resp = await api.post(`/file/`, formData, config);
      const arr2 = resp.data.files.map((i) => {
        return i.id;
      });
      if (arr2.length > 0) setFotoId(arr2[0]);
    } catch (error) {
      window.location.reload();
    }
  }

  function validacao() {
    let continuar = true;

    if (nome === '') {
      continuar = false;
    }
    if (email === '') {
      continuar = false;
    }

    if (Oldpassword !== '' && (password === '' || passwordAgain === '')) {
      continuar = false;
    }

    return continuar;
  }

  useEffect(() => {
    async function getData() {    
      try {
        const route = localStorage.getItem('@cabelus/tipo_usuario') === 'cli' ? 'cliente' : 'usuario';
        const response = await api.get(`/${route}/${id}`);

        const { error } = response.data;

        if (error === undefined) {
          const d = response.data;

          setNome(d.nome || '');
          setEmail(d.email || '');
          setLogin(d.login || '');
        }

        setIsLoaded(true);
      } catch (err) {
        setIsLoaded(true);
      }
    }

    if (id !== '') {
      getData();
    }
  }, [id]);

  const update = (obj) => {
    try {
     
      api.put(`/${tpuser}/${id}`, obj).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          communicate('Dados editados com sucesso', 2000, 'success');
          setTimeout(() => {
            window.location.reload();
          }, 600);
        } else {
          communicate(response.data.error, 3000, 'danger');
          setMsgError('* Preencha todos campos obrigatórios');
        }
      });
    } catch (error) {
      communicate(
        'Ops... Estamos passando por uma instabilidade..',
        3000,
        'danger'
      );
    }
  };

  const handleSubmit = (e) => {
    const obj = {
      avatar_id: foto_id || undefined,
      nome,
      login,
      email,
      senhaAntiga: Oldpassword || undefined,
      senha: password || undefined,
      confirmaSenha: passwordAgain || undefined,
    };

    e.preventDefault();
    setFormSubmitted(true);

    if (validacao()) {
      if (password !== passwordAgain) {
        communicate('As senhas devem ser iguais', 2000, 'danger');
      } else {
        update(obj);
      }
    }
  };

  const requiredField = (text) => {
    return <div className="invalid-feedback d-block">{text}</div>;
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Perfil" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="file">Trocar foto de perfil</Label>
                      <CustomInput
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleUploadChange}
                        accept="image/*"
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="nome">Nome</Label>
                      <Input
                        type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                      {formSubmitted &&
                        nome === '' &&
                        requiredField('O campo nome é obrigatório')}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={(tpuser !== 'cliente' ? 6 : 3)}>
                    <FormGroup>
                      <Label for="email">
                        <IntlMessages id="user.email" />
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {formSubmitted &&
                        email === '' &&
                        requiredField('O campo e-mail é obrigatório')}
                    </FormGroup>
                  </Colxx>
                  {tpuser !== 'cliente' && (
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="login">Login</Label>
                      <Input
                        type="text"
                        name="login"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                      {formSubmitted &&
                        login === '' &&
                        requiredField('O campo login é obrigatório')}
                    </FormGroup>
                  </Colxx>
                  )}

                  <Colxx sm={(tpuser !== 'cliente' ? 3 : 6)}>
                    <FormGroup>
                      <Label for="old-password">
                        <IntlMessages id="user.current-password" />
                      </Label>
                      <Input
                        type="password"
                        name="old-password"
                        id="old-password"
                        value={Oldpassword}
                        onChange={(event) => setOldPassword(event.target.value)}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={(tpuser !== 'cliente' ? 3 : 3)}>
                    <FormGroup>
                      <Label for="password">
                        <IntlMessages id="user.new-password" />
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      {formSubmitted &&
                        Oldpassword !== '' &&
                        password === '' &&
                        requiredField('Informe a nova senha')}
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={3}>
                    <FormGroup>
                      <Label for="password-again">
                        <IntlMessages id="user.new-password-again" />
                      </Label>
                      <Input
                        type="password"
                        name="password-again"
                        id="password-again"
                        value={passwordAgain}
                        onChange={(event) =>
                          setPasswordAgain(event.target.value)
                        }
                      />
                      {formSubmitted &&
                        password !== '' &&
                        passwordAgain === '' &&
                        requiredField('Confirme a nova senha')}
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <Button color="primary">
                  <IntlMessages id="user.submit" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default injectIntl(FormStand);
