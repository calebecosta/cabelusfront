import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle, CardText } from 'reactstrap';
import ThumbnailImage from './ThumbnailImage';

const UserCardBasic = ({ link = '#', data, deleteCallback }) => {
  return (
    <Card className="d-flex flex-row mb-4">
      <a
        href="#/"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          right: 0,
          margin: 10,
        }}
        className="glyph"
        onClick={() => deleteCallback(data.id)}
        onKeyDown={() => console.log('keyDown')}
      >
        <div className="glyph-icon simple-icon-trash" />
      </a>
      <NavLink to={`/app/agendamentos/form/${data.id}`} className="d-flex">
        <ThumbnailImage
          rounded
          src={`https://ui-avatars.com/api/?name=${data.clientes.nome}`} 
          alt={data.nome}
          className="m-4"
        />
      </NavLink>
      <div className=" d-flex flex-grow-1 min-width-zero">
        
        <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
          <div className="min-width-zero">
       
            <CardSubtitle  className="truncate mb-1">Agendado para {data.colaboradores.nome}</CardSubtitle>
 
            <CardText className="text-muted text-small mb-2">
              {data.email}
            </CardText>
            <NavLink to={`/app/agendamentos/form/${data.id}`}>
              <Button outline size="xs" color="primary">
                Visualizar
              </Button>
            </NavLink>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default React.memo(UserCardBasic);
