/* eslint-disable object-shorthand */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  FormGroup,
  Label,
  Button,
  Form,
  Nav,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';
import { alert } from '../../../helpers/Utils';
import api from '../../../services/api';

const FormClientes = ({ match, intl }) => {
   const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [id, setId] = useState('');
  const [nome, setNomeCliente] = useState('');
  const [email, setEmailCliente] = useState('');
  const [endereco, setEndereco] = useState('');
  const [Oldpassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isCliente, setIsCliente] = useState(false);
  const [colSize, setColSize] = useState(6);
  

  function validacao() {
    let continuar = true;

    if (nome === '') {
      continuar = false;
    }


    return continuar;
  }

  useEffect(() => {
    async function getData(colaborador_id) {
      try {
        const response = await api.get(`/cliente/${colaborador_id}`);
        const { error } = response.data;

        if (error === undefined) {
          const cliente = response.data;
          setNomeCliente(cliente.nome || '');
          setEmailCliente(cliente.email || '');
          setEndereco(cliente.endereco || '');
        }
      } catch (err) {
        console.log(err);
        alert(
          'Tivemos um problema para listar este cliente',
          3000,
          'danger'
        );
        setIsLoaded(true);
      }
    }

    if (match.params.id) {
      setIsCliente(true);
      setColSize(3);
      setId(match.params.id);
      getData(match.params.id);
    }
    setIsLoaded(true);
  }, []);


  const update = (obj) => {
    try {
      api.put(`/cliente/${id}`, obj).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Cliente editado com sucesso!', 2000, 'success');
          setTimeout(() => {
            window.location.reload();
          }, 600);
        } else {
          setLoading(false);
          alert(response.data.error, 3000, 'danger');
        }
      });
    } catch (error) {
      alert('Ops... Estamos passando por uma instabilidade..', 3000, 'danger');
    }
  };

  const insert = (obj) => {
    try {
      api.post(`/cliente/`, obj).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Cliente cadastrado com sucesso', 2000, 'success');
          setTimeout(() => {
            window.location = `/app/clientes`;
          }, 1000);
        } else {
            setLoading(false);
          alert(response.data.error, 3000, 'danger');
        }
      });
    } catch (error) {
      alert('Ops... Estamos passando por uma instabilidade..', 3000, 'danger');
    }
  };


  const handleSubmit = (e) => {
    const obj = {
      nome : nome,
      endereco : endereco,
      email: email,
      senhaAntiga: Oldpassword || undefined,
      senha: password || undefined,
      confirmaSenha: passwordAgain || undefined,
    };

    if(!loading) {
        setLoading(true);
      //   delet();
        e.preventDefault();
      }
    // if (validacao()) {
      if (match.params.id) {
        update(obj);
      } else {
        insert(obj);
      }
    // } else {
    //   window.scrollTo(0, 0);
    // }
    setFormSubmitted(true);
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
          <Breadcrumb heading="menu.novo-cliente" match={match} />
          <Nav tabs className="separator-tabs ml-0 mb-5" />

        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Colxx sm={6}>
                    <FormGroup>
                    <Label for="nome">Nome</Label>
                      <Input
                       
                        type="text"
                        name="nome"
                        id="razao"
                        onChange={(e) => setNomeCliente(e.target.value)}
                        value={nome}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                    <Label for="email">Email</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmailCliente(e.target.value)}
                        value={email}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                    <Label for="email">Endereço</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEndereco(e.target.value)}
                        value={endereco}
                      />
                    </FormGroup>
                  </Colxx>

                  {isCliente && (
                  <Colxx sm={6}>
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
                  )}
                
                  <Colxx sm={colSize}>
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

                  <Colxx sm={colSize}>
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
                    <Button onClick={handleSubmit} className={`float-right btn-multiple-state ${loading ? 'show-spinner' : ''}`} size="lg" color="primary" disabled={loading}>
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="user.submit" />
                    </span>
                  </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    </>
  );
};

export default injectIntl(FormClientes);
