import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { now } from 'moment';
import { Colxx } from '../../components/common/CustomBootstrap';

const ImageListView = ({
  product,
  isSelect,
  collect,
  onCheckItem,
  deleteCallback,
  editCallback,
}) => {
  // const colorStatus = '';
  // switch (product.status.id) {
  //   case 1:
  //     colorStatus = 'badge-secondary';
  //     break;
  //   case 2:
  //     colorStatus = 'badge-success';
  //     break;
  //   case 3:
  //     colorStatus = 'badge-danger';
  //     break;
  //   case 4:
  //     colorStatus = 'badge-warning';
  //     break;

  //   default:
  //     colorStatus = 'badge-secondary';
  //     break;
  // }
  return (
    <Colxx sm="6" lg="2" xl="3" className="mb-3" key={product.id}>
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(product.id)}
          className={classnames({
            active: isSelect,
          })}
        >
          <a
            href="#/"
            className="position-relative mascaraLogo"
            onClick={() => {
              editCallback(product.id);
            }}
            onKeyDown={() => console.log('keyDown')}
          >
            {/* <span
              className="position-absolute badge-top-left badge badge-success badge-pill"
            >
              Aprovado
            </span> */}
            <CardImg top alt={product.title}  src={`https://ui-avatars.com/api/?name=${product.nome}`} />
          </a>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <a
                  href="#/"
                  style={{ cursor: 'pointer' }}
                  className="glyph"
                  onClick={() => deleteCallback(product.id)}
                  onKeyDown={() => console.log('keyDown')}
                >
                  <div className="glyph-icon simple-icon-trash" />
                </a>
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle
                  onClick={() => {
                    editCallback(product.id);
                  }}
                >
                  {product.nome}
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                 Valor : { (product.valor).toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
