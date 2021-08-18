/* eslint-disable react/no-array-index-key */
import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card,Label, CardBody, CardTitle, Badge } from 'reactstrap';

import IntlMessages from '../../helpers/IntlMessages';
import data from '../../data/products';
import { adminRoot } from '../../constants/defaultValues';

import api from '../../services/api';



const RecentOrders = () => {
  const [dataApi, setDataApi] = useState(false);
  const [colaborador, setColaboradores] = useState([]);

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


  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button type="button" className="btn btn-header-light icon-button">
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
        <Label className="mt-4">
          Vamos lá, primeiro escolha um Profissinal abaixo:
        </Label>
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
             {colaborador.map((itemData) => {
              return (
                <div key={itemData.id} className="d-flex flex-row mb-3">
                  <NavLink
                    to={`${adminRoot}/pages/product/details`}
                    className="d-block position-relative"
                  >
                    <img
                      src={`https://i.pravatar.cc/?u=${itemData.id}`}
                      alt={itemData.nome}
                      className="list-thumbnail border-0"
                    />
                    <Badge
                      key={itemData.id}
                      className="position-absolute badge-top-right"
                      color="success"
                      pill
                    >
                      Disponível
                    </Badge>
                  </NavLink>

                  <div className="pl-3 pt-2 pr-2 pb-4">
                    <NavLink to={`${adminRoot}/pages/product/details`}>
                      <p className="list-item-heading">{itemData.nome}</p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          {itemData.observacao}
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                        {colaborador.nome}
                      </div>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default RecentOrders;
