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

const FormServicos = ({ match, intl }) => {
   const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [id, setId] = useState('');
  const [nome, setNomeServico] = useState('');
  const [valor, setValorServico] = useState('');
  const [Oldpassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isServico, setIsServico] = useState(false);
  const [colSize, setColSize] = useState(6);
  

  function validacao() {
    let continuar = true;

    if (nome === '') {
      continuar = false;
    }
    return continuar;
  }

  useEffect(() => {
    async function getData(servico_id) {
      try {
        const response = await api.get(`/servico/${servico_id}`);
        const { error } = response.data;

        if (error === undefined) {
          const servico = response.data;
          setNomeServico(servico.nome || '');
          setValorServico(servico.valor || '');
        }
      } catch (err) {
        console.log(err);
        alert(
          'Tivemos um problema para listar este servico',
          3000,
          'danger'
        );
        setIsLoaded(true);
      }
    }

    if (match.params.id) {
      setIsServico(true);
      setColSize(3);
      setId(match.params.id);
      getData(match.params.id);
    }
    setIsLoaded(true);
  }, []);


  const update = (obj) => {
    try {
      api.put(`/servico/${id}`, obj).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Servico editado com sucesso!', 2000, 'success');
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
      api.post(`/servico/`, obj).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Servico cadastrado com sucesso', 2000, 'success');
          setTimeout(() => {
            window.location = `/app/servicoes`;
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
      valor: valor,
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
          <Breadcrumb heading="menu.novo-servico" match={match} />
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
                    <Label for="nome_cliente">Nome</Label>
                      <Input
                       
                        type="text"
                        name="razao_social"
                        id="razao"
                        onChange={(e) => setNomeServico(e.target.value)}
                        value={nome}
                      />
                    </FormGroup>
                  </Colxx>

               
                  <Colxx sm={6}>
                    <FormGroup>
                    <Label for="valor">Valor</Label>
                      <Input
                       
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setValorServico(e.target.value)}
                        value={valor}
                      />
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

export default injectIntl(FormServicos);
