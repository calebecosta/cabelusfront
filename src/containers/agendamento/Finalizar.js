import React,{useEffect,useState} from 'react';
import moment from 'moment';
import { Card,Input, Label} from 'reactstrap';
import api from '../../services/api';


moment.locale('pt') 

const Finalizar = () => {

  const [dataApi, setDataApi] = useState(false);
  const [nomeColaborador, setNomeColaborador] = useState('');
  const [nomeServico, setNomeServico] = useState('');
  const [observacao, setObservacao] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/colaborador/${(JSON.parse(localStorage.getItem("agendamento")).colaborador_id)}`);

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


  const handleChangeObservacao = (text) =>{
    const agendamento = JSON.parse(localStorage.getItem("agendamento"));
    agendamento.observacao = text;
    localStorage.setItem("agendamento",JSON.stringify(agendamento));

  }



  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/servico/${(JSON.parse(localStorage.getItem("agendamento")).servico_id)}`);

        const { error } = response.data;

        if (error === undefined) {
       
          setNomeServico(response.data.nome);
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
            <p><br/>Colaborador: {nomeColaborador}</p>
            <p><br/>Serviço(s): {nomeServico}</p>
            <p><br/>Data de Agendamento: {moment((JSON.parse(localStorage.getItem("agendamento")).data)).format("DD/MM/YYYY HH:mm:ss")}</p>

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
