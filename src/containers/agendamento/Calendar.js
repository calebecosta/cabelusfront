/* eslint-disable import/newline-after-import */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
import React,{useEffect,useState} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import CalendarToolbar from '../../components/CalendarToolbar';
import IntlMessages from '../../helpers/IntlMessages';
import data from '../../data/events';
import api from '../../services/api';
import { alert , getDirection } from '../../helpers/Utils';


require('moment/locale/pt-br')
const localizer = momentLocalizer(moment);

const CalendarCard = () => {

const [eventos, setEventos] = useState([]);
useEffect(() => {
  async function getData() {
    try {
      const response = await api.get(`/agendamentos`);
      const { error } = response.data;

      if (error === undefined) {
        const eventosFormated = response.data.map((evento) => {
          return {
            title : `Agendamento - ${evento.colaboradores.nome}`,
            start: moment(moment(evento.data)).toDate(),
            end: moment(moment(evento.data)).toDate(),
            allDay: false,
          };
        });
        setEventos(eventosFormated);
      }
    } catch (err) {
      alert(
        'Tivemos um problema para listar os eventos do calendário',
        3000,
        'danger'
      );
    }

  
  }
  getData();
}, []);


  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.calendar" />
        </CardTitle>
        <Calendar
          localizer={localizer}
          style={{ minHeight: '500px' }}
          events={eventos}
          rtl={getDirection().isRtl}
          views={['month', 'day', 'agenda']}
          components={{
            toolbar: CalendarToolbar,
          }}
        />
      </CardBody>
    </Card>
  );
};
export default CalendarCard;
