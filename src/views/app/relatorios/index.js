/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import ReactExport from 'react-export-excel';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  Form,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import pt from 'date-fns/locale/pt-BR';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { NotificationManager } from '../../../components/common/react-notifications';

import 'react-datepicker/dist/react-datepicker.css';

import 'react-tagsinput/react-tagsinput.css';

import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
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
import list from '../servicos/list';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

registerLocale('pt', pt);
moment.locale('pt');

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

  const [colaboradores, setColaboradores] = useState([]);

  const [colaboradorSelected, setColaboradorSelected] = useState([]);
  const [servicoSelected, setServicoSelected] = useState([]);
  const [clienteSelected, setClienteSelected] = useState([]);
  const [dataRelatorio, setDataRelatorio] = useState([]);

  const [servicos, setServicos] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [dt_inicio, setDtInicio] = useState('');
  const [dt_fim, setDtFim] = useState('');

  const tpuser =
    localStorage.getItem('@cabelus/tipo_usuario') === 'cli'
      ? 'cliente'
      : 'usuario';

  const MoneyFormat = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const Download = (props) => {
    const { list } = props;
    return (
      <ExcelFile element={<Button className="float-right" color="primary">Gerar XLS</Button>}>
        <ExcelSheet data={list} name="Adesões">
          <ExcelColumn
            label="Nome do Cliente"
            value={(agend) => agend.clientes.nome}
          />
          <ExcelColumn
            label="Nome do Colaborador"
            value={(agend) => agend.colaboradores.nome}
          />
          <ExcelColumn
            label="Data de Agendamento"
            value={(agend) => moment(agend.data).format('DD/MM/YYYY HH:mm:ss')}
          />
          <ExcelColumn
            label="Serviço"
            value={(agend) => {
              let servicos = '';
              agend.servicos.map((servico) => {
                console.log(servico);
                servicos += `${servico.nome},`;
              });
              return servicos.slice(0, -1);
            }}
          />

          <ExcelColumn
            label="Total (R$) agendamento"
            value={(agend) => {
              let servicos = '';
              agend.servicos.map((servico) => {
                console.log(servico);
                servicos += `${servico.valor},`;
              });
              return MoneyFormat(servicos.slice(0, -1));
            }}
          />

          <ExcelColumn
            label="Observação do Agendamento"
            value={(agend) => agend.observacao}
          />
        </ExcelSheet>
      </ExcelFile>
    );
  };

  useEffect(() => {
    const usuario = getCurrentUser();
    setId(usuario.id);
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
        const response = await api.get(`/servico`);

        const { error } = response.data;

        if (error === undefined) {
          const servicosFormated = response.data.map((sta) => {
            return {
              label: sta.nome,
              value: sta.id,
              key: sta.id,
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
    } else if (type === 'warning') {
      NotificationManager.warning(text, '', time, null, null, 'filled');
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
        const route =
          localStorage.getItem('@cabelus/tipo_usuario') === 'cli'
            ? 'cliente'
            : 'usuario';
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

  const get =  async (obj) => {
    try {
      api.post(`/relatorios/`, obj).then((response) => {
        const { error } = response.data;
        if (error === undefined) {
          communicate(
            'Estamos gerando seu relatorio. Por favor, aguarde.',
            2000,
            'warning'
          );
          setDataRelatorio(response.data);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 600);
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
    e.preventDefault();
    setFormSubmitted(true);

    const obj = {
      servico_id: servicoSelected.key || undefined,
      colaborador_id: colaboradorSelected.key || undefined,
      cliente_id: clienteSelected.key || undefined,
      data_fim: dt_fim || undefined,
      data_inicio: dt_inicio || undefined,
    };
    get(obj);
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
          <Breadcrumb heading="Relatórios" match={match} />
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
                      <Label for="colaborador">Colaborador</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="category"
                        placeholder="Selecione..."
                        value={colaboradorSelected}
                        onChange={setColaboradorSelected}
                        options={colaboradores}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="colaborador">Tipo de Serviço</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="category"
                        placeholder="Selecione..."
                        value={servicoSelected}
                        options={servicos}
                        onChange={setServicoSelected}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="colaborador">Cliente</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="category"
                        placeholder="Selecione..."
                        options={clientes}
                        value={clienteSelected}
                        onChange={setClienteSelected}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={3}>
                    <FormGroup>
                      <Label for="colaborador">Data Fim</Label>
                      <DatePicker
                        onChangeRaw={(e) => e.preventDefault()}
                        showTimeSelect
                        locale="pt"
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeIntervals={60}
                        selected={dt_inicio}
                        onChange={(e) => {
                          setDtInicio(e);
                        }}
                        placeholderText="Selecione uma data"
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={3}>
                    <FormGroup>
                      <Label for="colaborador">Data Fim</Label>
                      <DatePicker
                        onChangeRaw={(e) => e.preventDefault()}
                        showTimeSelect
                        locale="pt"
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeIntervals={60}
                        selected={dt_fim}
                        onChange={(e) => {
                          setDtFim(e);
                        }}
                        placeholderText="Selecione uma data"
                      />
                    </FormGroup>
                  </Colxx>
                </FormGroup>
                <Download list={ dataRelatorio} />
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default injectIntl(FormStand);
