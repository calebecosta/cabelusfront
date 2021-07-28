/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { injectIntl } from 'react-intl';

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import UserCardBasic from '../../../containers/colaborador/UserCardBasic';

import api from '../../../services/api';

const FormStand = ({ match, intl }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [dataApi, setDataApi] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/colaborador`);

        const { error } = response.data;

        if (error === undefined) {
          const d = response.data;

          setAgendamentos(d);
        }

        setIsLoaded(true);
      } catch (err) {
        console.log(err);
        setIsLoaded(true);
      }
    }

    getData();
  }, [dataApi]);

  function deletarUsuario(id) {
    setModalBasic(true);
    setDeleteId(id);
  }

  function remover() {
    if (deleteId !== '') {
      api.delete(`/colaborador/${deleteId}`).then((i) => {
        setDataApi(!dataApi);
        setModalBasic(false);
      });
    }
  }

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
        <ModalHeader>
          <i className="simple-icon-exclamation" /> Confirmação
        </ModalHeader>
        <ModalBody>Tem certeza que deseja remover este Agendamento?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => remover()}>
            Sim, com certeza
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Não
          </Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Colxx xxs="12">
          <h1>Colaboradores</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {agendamentos.map((itemData) => {
          return (
            <Colxx xxs="12" md="6" lg="4" key={`friend_${itemData.id}`}>
              <UserCardBasic survey={itemData} data={itemData} deleteCallback={deletarUsuario} />
            </Colxx>
          );
        })}
      </Row>
    </>
  );
};

export default injectIntl(FormStand);
