import React,{useState,useEffect } from 'react';
import {
  Row,
  Card,
  CustomInput,
  CardTitle,
  FormGroup,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


import { Colxx } from '../../components/common/CustomBootstrap';
import api from '../../services/api';


const Servicos = () => {

  const [dataApi, setDataApi] = useState(false);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/servico`);

        const { error } = response.data;

        if (error === undefined) {
          const s = response.data;

          setServicos(s);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [dataApi]);

    const handleServicoChange = (id) => {
      const servico = JSON.parse(localStorage.getItem("agendamento"));
      servico.servico_id = id;
      localStorage.setItem("agendamento",JSON.stringify(servico));
    }

  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4" />
        <Row>
        <Colxx xxs="12">
        {servicos.map((itemData) => {
          return (
          <div key={itemData.id}>
         
            <Card className="d-flex flex-row mb-3">
              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <NavLink to="#" location={{}} className="w-40 w-sm-100">
                    <p className="list-item-heading mb-1 truncate">
                      {itemData.nome}
                    </p>
                  </NavLink>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {itemData.nome}
                  </p>
                  <p className="mb-1 text-muted text-small w-15 w-sm-100">
                    teste
                  </p>
                  <div className="w-15 w-sm-100">
                    <Badge color="primary" pill>
                    teste
                    </Badge>
                  </div>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <FormGroup className="mb-0">
                    <CustomInput onClick={(e) => handleServicoChange(itemData.id)}  type="checkbox" id="check1" label="" />
                  </FormGroup>
                </div>
              </div>
            </Card>
            </div>
          );
          })}
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};
export default Servicos;
