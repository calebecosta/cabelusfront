import React,{useEffect,useState} from 'react';
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import IntlMessages from '../../helpers/IntlMessages';
import { AreaChart } from '../../components/charts';
import api from '../../services/api';
import { areaChartData } from '../../data/charts';


const WebsiteVisitsChartCard = ({ className = '', controls = true }) => {

  console.log(areaChartData);

  const [metricas, setMetricas] = useState('')
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/dashboard?range=semanal`);

        const { error } = response.data;

        if (error === undefined) {
          console.log(response.data);
          setMetricas(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);


  async function changeChart(type) {
    try {
      const response = await api.get(`/dashboard?range=${type}`);

      const { error } = response.data;

      if (error === undefined) {
        console.log(response.data);
        setMetricas(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }



  
  return (
    <Card className={`${className} dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="dashboards.website-visits" />
            </h5>
            <span className="text-muted text-small d-block">
              <IntlMessages id="dashboards.unique-visitors" />
            </span>
          </div>
        </div>
        {controls && (
          <div className="btn-group float-right float-none-xs mt-2">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id="dashboards.this-week" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem  onClick={(e)=> {changeChart('semanal')}}>
                  <IntlMessages id="dashboards.this-month" />
                </DropdownItem>
                <DropdownItem onClick={(e)=> {changeChart('mensal')}}>
                  <IntlMessages id="dashboards.this-year" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart shadow data={metricas} />
      </div>
    </Card>
  );
};

export default WebsiteVisitsChartCard;
