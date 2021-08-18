/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
import react,{useState} from 'react';
import DatePicker,{registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from "date-fns/locale/pt-BR";
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import moment from 'moment';
import {
    Row,
    Card,
    CardBody,
    Input,
    FormGroup,
    Label,
    Button,
    Form,
    Nav,
  
  } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';

registerLocale("pt", pt)
moment.locale('pt') 


const DataAgendamento = ( ) => { 

    const isWeekday = (date: Date) => {
        const day = date.getDay(date)
        return day !== 0 && day !== 6
      }

    const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
    };

    const [option,setOption] = useState('');
    const [dt_inicio, setDtInicio] = useState('');

    const onChageDtAgendamento = (e) => {
        setDtInicio(e)
        const data = JSON.parse(localStorage.getItem("agendamento"));
        data.data = e;
        localStorage.setItem("agendamento",JSON.stringify(data));
    }
    
return (
    <>
    <Colxx sm={6}>
    <FormGroup>
    <Label for="colaborador">Data de Agendamento</Label>
    <DatePicker
    disabled={option}
        onChangeRaw={(e)=> e.preventDefault()}
        showTimeSelect
        locale='pt'
        dateFormat="dd/MM/yyyy HH:mm"
        minDate={moment().toDate()}
        minTime={setHours(setMinutes(new Date(), 0), 8)}
        maxTime={setHours(setMinutes(new Date(), 30), 18)}
        timeIntervals={60}
        filterDate={isWeekday}
        filterTime={filterPassedTime}
        selected={dt_inicio}
        onChange={(e)=>{onChageDtAgendamento(e)}}
        placeholderText="Selecione uma data"
    />
    </FormGroup>
    </Colxx>
    </>
    );
    };
export default DataAgendamento;
