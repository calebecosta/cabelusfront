import React from 'react';
import moment from 'moment';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';

const DataListView = ({
  agendamento,
  isSelect,
  collect,
  onCheckItem,
  editCallback,
  deleteCallback,
}) => {
  const nome_cliente = (agendamento.clientes !== null ? agendamento.clientes.nome : '')
  const nome_colaborador = ( agendamento.colaboradores !== null  ? agendamento.colaboradores.nome : '')
  const data = ( agendamento.data !== null  ? moment(agendamento.data ,'YYYY-MM-DD').utc().format("DD/MM/YYYY HH:mm:ss") : '')
  const { id = '' } = agendamento.id
  
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={agendamento.id} collect={collect}>
        <Card
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink
                onClick={() => editCallback(agendamento.id)}
                to="#"
                className="w-40 w-sm-100"
              >
                <p className="list-item-heading mb-1 truncate">
                  {nome_colaborador}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {nome_cliente}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
              agendamento
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {data}
              </p>
            </div>
            <div className="d-flex">
              <a
                href="#/"
                style={{
                  cursor: 'pointer',
                  paddingTop: '35px',
                  paddingRight: '20px',
                }}
                className="glyph"
                onClick={() => deleteCallback(agendamento.id)}
                onKeyDown={() => console.log('keyDown')}
              >
                <div className="glyph-icon simple-icon-trash" />
              </a>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};


export default React.memo(DataListView);
