/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'moment/locale/pt-br';
import moment from 'moment';
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import Select from 'react-select';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import IntlMessages from '../../../helpers/IntlMessages';
import { cnpjMask, cpfMask, phoneMask, alert } from '../../../helpers/Utils';
import CustomSelectInput from '../../../components/common/CustomSelectInput';

import api from '../../../services/api';

const FormOperadora = ({ match, intl }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const { messages } = intl;

  const [id, setId] = useState('');
  const [nome_colaborador, setNomeColaborador] = useState('');
  const [email, setEmail] = useState('');

  
  useEffect(() => {
    async function getData(operadora_id) {
      try {
        const response = await api.get(`/colaborador/${operadora_id}`);

        const { error } = response.data;

        if (error === undefined) {
          const colaborador = response.data;
          
          setNomeColaborador(colaborador.nome || '');
          setEmail(colaborador.email || '');

        }
      } catch (err) {
        console.log(err);
      }
    }
    if (match.params.id) {
      setId(match.params.id);
      getData(match.params.id);
    } else {
      alert('Tivemos um problema para listar esse mergulhador', 3000, 'danger');
      setTimeout(() => {
        window.location = '/app/operadora';
      }, 1500);
    }
    setIsLoaded(true);
  }, []);

 

  const delet = () => {
    try {
      api.delete(`/colaborador/${id}`).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Colaborador deletado com sucesso!', 2000, 'success');
          setTimeout(() => {
            window.location = '/app/colaboradores';
          }, 2000);
        } else {
          alert(response.data.error, 3000, 'danger');
        }
        setLoading(false);
      });
    } catch (error) {
      alert(
        'Tivemos um pequeno problema para atualizar o status da operadora',
        3000,
        'danger'
      );
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    if(!loading) {
      setLoading(true);
      delet();
      e.preventDefault();
    }
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.colaborador" match={match} />
          <Separator className="mb-5" />
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
                    <Label for="nome_fantasia">Nome</Label>
                      <Input
                        disabled
                        type="text"
                        name="razao_social"
                        id="razao"
                        value={nome_colaborador}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="nome_fantasia">Email</Label>
                      <Input
                        disabled
                        type="text"
                        name="nome_fantasia"
                        id="nome_fantasia"
                        value={email}
                      />
                    </FormGroup>
                  </Colxx>
              
                 
                </FormGroup>
                <Button onClick={handleCancel} className={`float-right btn-multiple-state ${loading ? 'show-spinner' : ''}`} size="lg" color="danger" disabled={loading}>
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="menu.deletar-colaborador" />
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

export default injectIntl(FormOperadora);
