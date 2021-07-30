import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import WebsiteVisitsChartCard from '../../../containers/dashboard/WebsiteVisitsChartCard';

const Dashboard = ({ match }) => {
  return (
    <>
     <WebsiteVisitsChartCard/>
    </>
  );
};

export default Dashboard;
