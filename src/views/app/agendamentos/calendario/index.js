/* eslint-disable import/no-unresolved */
import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Calendar from '../../../../containers/agendamento/Calendar';


const Calendario = ({ match }) => (
  <>
   <Calendar />
  </>
);
export default Calendario;
