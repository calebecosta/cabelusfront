/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React,{useState,useEffect}from 'react';
import { WithWizard } from 'react-albus';
import { Button } from 'reactstrap';
import api from '../../services/api';
import { alert } from '../../helpers/Utils';




const BottomNavigation = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  nextLabel,
}) => {
  const [loading, setLoading] = useState(false);

  const insert = (obj) => {
    try {
      api.post(`/agendamentos/`, obj).then((response) => {
        const { error } = response.data;
  
        if (error === undefined) {
          alert('Agendamento cadastrado com sucesso', 2000, 'success');
          setTimeout(() => {
            window.location = `/app/agendamentos`;
          }, 1000);
        } else {
            setLoading(false);
          alert(response.data.error, 3000, 'danger');
        }
      });
    } catch (error) {
      alert('Ops... Estamos passando por uma instabilidade..', 3000, 'danger');
    }
  };

  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        <div className={`wizard-buttons ${className}`}>
          <Button
            color="primary"
            className={`mr-1 ${loading ? 'show-spinner' : ''} ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
            onClick={() => {
              onClickPrev(previous, steps, step);
            }}
          >
            {prevLabel}
          </Button>

          <Button
            color="primary"
            className={
              steps.indexOf(step) >= steps.length - 1 ? '' : ''
            }
            
            onClick={() => {
              if(steps.indexOf(step) >= steps.length - 1 ){
                insert(JSON.parse(localStorage.getItem("agendamento")));            
              }
              onClickNext(next, steps, step);
            }}
          >
            {nextLabel}
          </Button>
        </div>
      )}
    />
  );
};
export default BottomNavigation;
