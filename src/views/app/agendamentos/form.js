/* eslint-disable object-shorthand */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import DatePicker,{registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import pt from "date-fns/locale/pt-BR";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'


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

import Select from 'react-select';

import { Colxx } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import IntlMessages from '../../../helpers/IntlMessages';
import { alert } from '../../../helpers/Utils';
import api from '../../../services/api';


registerLocale("pt", pt)
moment.locale('pt') 

const FormPontoMergulho = ({ match, intl }) => {
   const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAgendamento, setIsAgendamento] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { messages } = intl;

  const [id, setId] = useState('');
  const [colaborador_id, setColaboradorId] = useState('');
  const [nome, setNome] = useState('');
  const [nome_cliente, setNomeCliente] = useState('');

  const [email, setEmailColaborador] = useState('');
  const [observacao, setObservacao] = useState('');
  const [colaboradorSelected, setColaboradorSelected] = useState([]);
  const [servicoSelected, setServicoSelected] = useState([]);
  const [clienteSelected, setClienteSelected] = useState([]);
  
  const [dt_inicio, setDtInicio] = useState('');
  const [nome_colaborador, setNomeColaborador] = useState('');
  const [clientes, setClientes] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [option,setOption] = useState('');
  

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];


  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const days = ['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const localePt = {
    localize: {
      month: (n) => months[n],
      day: (n) => days[n],
    }
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay(date)
    return day !== 0 && day !== 6
  }

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

 

  function validacao() {
    let continuar = true;

    if (nome === '') {
      continuar = false;
    }


    return continuar;
  }

  useEffect(() => {
    async function getData(agendamento_id) {
      try {
        const response = await api.get(`/agendamentos/${agendamento_id}`);
        const { error } = response.data;

        if (error === undefined) {
            const agendamento = response.data;
            setNomeCliente(agendamento.clientes.nome || '');
            setNomeColaborador(agendamento.colaboradores.nome || '');
            setColaboradorId(agendamento.colaboradores.id || '');
            setDtInicio(moment(moment(agendamento.data)).toDate() || '');
            setObservacao(agendamento.observacao || '');
            if (agendamento.colaboradores) {
                setEmailColaborador(agendamento.colaboradores.email);
                setColaboradorSelected({
                  label: agendamento.colaboradores.nome,
                  value: agendamento.colaboradores.id,
                  key: agendamento.colaboradores.id,
                });
              }
            if (agendamento.clientes) {
                setClienteSelected({
                  label: agendamento.colaboradores.nome,
                  value: agendamento.colaboradores.id,
                  key: agendamento.colaboradores.id,
                });
              }
            if (agendamento.servicos) {
                setServicoSelected({
                  label: agendamento.servicos.nome,
                  value: agendamento.servicos.id,
                  key: agendamento.servicos.id,
                });
              }
  
        }
      } catch (err) {
        console.log(err);
        alert(
          'Tivemos um problema para listar este agendamento',
          3000,
          'danger'
        );
        setIsLoaded(true);
      }
    }


    if (match.params.id) {
      setId(match.params.id);
      getData(match.params.id);
      setIsAgendamento(true);
      setOption('disabled');
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/colaborador`);

        const { error } = response.data;

        if (error === undefined) {
          const colaboradorFormated = response.data.map((sta) => {
            return {
              label: sta.nome,
              value: sta.id,
              key: sta.id,
            };
          });
          setColaboradores(colaboradorFormated);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/cliente`);

        const { error } = response.data;

        if (error === undefined) {
          const clientesFormated = response.data.map((sta) => {
            return {
              label: sta.nome,
              value: sta.id,
              key: sta.id,
            };
          });
          setClientes(clientesFormated);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/servico`);

        const { error } = response.data;

        if (error === undefined) {
          const servicosFormated = response.data.map((serv) => {
            return {
              label: serv.nome,
              value: serv.id,
              key: serv.id,
            };
          });
          setServicos(servicosFormated);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  const update = (obj) => {
    try {
      api.put(`/pontomergulho/${id}`, obj).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Ponto de Mergulho editado com sucesso!', 2000, 'success');
          setTimeout(() => {
            window.location.reload();
          }, 600);
        } else {
          alert(response.data.error, 3000, 'danger');
        }
      });
    } catch (error) {
      alert('Ops... Estamos passando por uma instabilidade..', 3000, 'danger');
    }
  };

  const insert = (obj) => {
    try {
      api.post(`/agendamentos/`, obj).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Agendamento cadastrado com sucesso', 2000, 'success');
          setTimeout(() => {
            window.location = `/app/agendamentos`;
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

  const delet = () => {
    try {
      api.delete(`/agendamentos/${id}`).then((response) => {
        const { error } = response.data;

        if (error === undefined) {
          alert('Agendamento cancelado com sucesso!', 2000, 'success');
          setTimeout(() => {
            window.location = '/app/agendamentos';
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
  const handleSubmit = (e) => {
    const obj = {
      nome : nome_cliente,
      colaborador_id : colaboradorSelected.value,
      servico_id : servicoSelected.value,
      data : dt_inicio,
      observacao : observacao,
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
          <Breadcrumb heading="menu.novo-agendamento" match={match} />
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
                    <Label for="colaborador">Cliente</Label>
                      <Select
                       
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="category"
                        placeholder="Selecione..."
                        defaultValue={clienteSelected}
                        value={clienteSelected}
                        onChange={setClienteSelected}
                        options={clientes}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                    <Label for="colaborador">Colaborador</Label>
                      <Select
                       
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="category"
                        placeholder="Selecione..."
                        defaultValue={colaboradorSelected}
                        value={colaboradorSelected}
                        onChange={setColaboradorSelected}
                        options={colaboradores}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={12}>
                    <FormGroup>
                    <Label for="colaborador">Tipo de Serviço</Label>
                      <Select
                       
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="category"
                        placeholder="Selecione..."
                        defaultValue={servicoSelected}
                        value={servicoSelected}
                        onChange={setServicoSelected}
                        options={servicos}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                      <FormGroup>
                      <Label for="colaborador">Data de Agendamento</Label>
                        <DatePicker
                         disabled={option}
                          onChangeRaw={(e)=> e.preventDefault()}
                          showTimeSelect
                          locale='pt'
                          dateFormat="dd/MM/yyyy HH:mm"
                          minDate={moment().toDate()}
                          minTime={setHours(setMinutes(new Date(), 0), 8)}
                          maxTime={setHours(setMinutes(new Date(), 30), 18)}
                          timeIntervals={60}
                          filterDate={isWeekday}
                          filterTime={filterPassedTime}
                          selected={dt_inicio}
                          onChange={(e)=>{setDtInicio(e)}}
                          placeholderText="Selecione uma data"
                        />
                      </FormGroup>
                    </Colxx>

                    {isAgendamento && ( 
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="data">Email do Colaborador</Label>
                      <Input
                        disabled={isAgendamento}
                        type="text"
                        name="data"
                        id="data"
                        value={email}
                      />
                    </FormGroup>
                  </Colxx>
                  )}

            
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label for="observacao">Observacao</Label>
                      <Input
                        disabled={isAgendamento}
                        type="textarea"
                        name="observacao"
                        id="observacao"
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                   
                      />
                    </FormGroup>
                  </Colxx>

                </FormGroup>
                { isAgendamento ? (
                <Button onClick={handleCancel} className={`float-right btn-multiple-state ${loading ? 'show-spinner' : ''}`} size="lg" color="danger" disabled={loading}>
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="menu.cancelar-agendamento" />
                  </span>
                </Button>
                ) : ( 
                    
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
                )} 
              </Form>
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    </>
  );
};

export default injectIntl(FormPontoMergulho);
