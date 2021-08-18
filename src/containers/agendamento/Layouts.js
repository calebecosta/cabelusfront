/* eslint-disable no-param-reassign */
import React, {useState,useEffect} from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../helpers/IntlMessages';
import BottomNavigation from '../../components/wizard/BottomNavigation';
import TopNavigation from '../../components/wizard/TopNavigation';
import { Colxx } from '../../components/common/CustomBootstrap';
import RecentOrders from "./RecentOrders";
import Colaboradores from "./Colaboradores";
import Servicos from "./Servicos";
import Finalizar from "./Finalizar";
import DataAgendamento from "./DataAgendamento";
import Jumbotron from "./Jumbotron";
import { getCurrentUser } from '../../helpers/Utils';

const Layouts = ({ intl }) => {

  const [userData, setUserData ] = useState([])
  const [finalStep, setFinalStep ] = useState(false)
  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    
    if(steps.indexOf(step) === 3){
      setFinalStep(true);
    }
    goToNext();

  };

  

  const onClickPrev = (goToPrev, steps, step) => {
   console.log(steps.indexOf(step) !== 3)
    if(steps.indexOf(step) !== 3){
      setFinalStep(false);
    }
    
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  
  useEffect(() => {
   setUserData(getCurrentUser());
  }, [])




  const { messages } = intl;
  return (
      <Colxx xxs="24" xl="12" className="mb-5">
        <Card>
          <CardBody className="wizard wizard-default">
            <Wizard>
              <TopNavigation
                className="justify-content-between"
                disableNav={false}
                topNavClick={topNavClick}
              />
              <Steps>
                <Step
                  id="step1"
                  name="Bem vindo"
                  desc="Olá"
                >
                  <div className="wizard-basic-step text-center">
                    <Jumbotron data={userData}/>
                   
                  </div>
                </Step>
                <Step
                  id="step2"
                  name="Profissional"
                  desc="Escolha um profissinal"
                >
                   <Colaboradores />
                     
                </Step>
                <Step
                  id="step3"
                  name="Serviço"
                  desc="Escolha um tipo de serviço"
                >
                 
                 <Servicos />
                </Step>
                <Step
                  id="step4"
                  name="Data do Agendamento"
                  desc="Escolha a data de seu agendamento"
                >
                  <DataAgendamento/>

                </Step>
                <Step
                  id="step5"
                  name="Concluir"
                  desc="finalizar"
                >
                  <Finalizar/>
                </Step>
              </Steps>
              <BottomNavigation
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                className="justify-content-between"
                prevLabel="Voltar"
                nextLabel={finalStep ? "Finalizar" : "Próximo"}
              />
            </Wizard>
          </CardBody>
        </Card>
      </Colxx>

  );
};
export default injectIntl(Layouts);
