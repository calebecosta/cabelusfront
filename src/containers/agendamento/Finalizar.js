import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, Input, Label } from 'reactstrap';
import api from '../../services/api';

moment.locale('pt');

const Finalizar = () => {
  const [dataApi, setDataApi] = useState(false);
  const [nomeColaborador, setNomeColaborador] = useState('');
  const [servico, setServico] = useState('');
  const [observacao, setObservacao] = useState('');

  const MoneyFormat = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(
          `/colaborador/${
            JSON.parse(localStorage.getItem('agendamento')).colaborador_id
          }`
        );

        const { error } = response.data;

        if (error === undefined) {
          const d = response.data;
          setNomeColaborador(response.data.nome);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [dataApi]);

  const handleChangeObservacao = (text) => {
    const agendamento = JSON.parse(localStorage.getItem('agendamento'));
    agendamento.observacao = text;
    localStorage.setItem('agendamento', JSON.stringify(agendamento));
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(
          `/servico/${
            JSON.parse(localStorage.getItem('agendamento')).servico_id
          }`
        );
        
        const { error } = response.data;

        if (error === undefined) {
          setServico(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <Card className="card mb-5">
      <div className="jumbotron ">
        <h1 className="display-10">Verifique os dados escolhidos abaixo :</h1>
        <p>
          <br/>
          Profissinal: {nomeColaborador}
        </p>
        <p>
          <br />
          Serviço(s): {servico.nome}
        </p>
        <p>
          <br/>
          Total: {MoneyFormat(servico.valor)}
          
        </p>
        <p>
          <br/>
          Data de Agendamento:{' '}
          {moment(JSON.parse(localStorage.getItem('agendamento')).data).format(
            'DD/MM/YYYY HH:mm:ss'
          )}
        </p>

        <Label>Observação?</Label>
        <Input
          type="textarea"
          name="observacao"
          id="observacao"
          onChange={(e) => handleChangeObservacao(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default React.memo(Finalizar);
