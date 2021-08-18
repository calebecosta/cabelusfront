/* eslint-disable no-cond-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
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

const Colaboradores = () => {

  const [dataApi, setDataApi] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/colaborador`);

        const { error } = response.data;

        if (error === undefined) {
          const d = response.data;

          setColaboradores(d);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [dataApi]);


 
    const handleColaboradorChange = (id,e) => {
     
      const colaborador = JSON.parse(localStorage.getItem("agendamento"));
      colaborador.colaborador_id = id;
      localStorage.setItem("agendamento",JSON.stringify(colaborador));
    
     
      if(document.getElementById(`${e.target.id}`).checked === false){
        document.getElementsByClassName(`checkbox-toggle-${e.target.id}`).firstElementChild.checked = false;

      }

    }
    const handleChecked = (id) => {
      
    
     
    }

  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4" />
        <Row>
        <Colxx xxs="12">
        {colaboradores.map((itemData) => {
           handleChecked(itemData.id)
          return (
          <div key={itemData.id}>
         
            <Card className="d-flex flex-row mb-3">
              <NavLink to="#" location={{}} className="d-flex">
                <img
                  alt="Thumbnail"
                  src={`https://i.pravatar.cc/?u=${itemData.id}`}
                  className="list-thumbnail responsive border-0 card-img-left"
                />
              </NavLink>
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
                    Cabelereiro
                  </p>
                  <div className="w-15 w-sm-100">
                    <Badge color="info" pill>
                    Disponível
                    </Badge>
                  </div>
                </div>
                <div  className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <FormGroup id={itemData.id}  className="mb-0">
                    <CustomInput  id={`checkbox-${itemData.id}`} className={`checkbox-toggle-${itemData.id}`} onClick={(e) => handleColaboradorChange(itemData.id,e)} type="checkbox"  label="" />
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

export default Colaboradores;
