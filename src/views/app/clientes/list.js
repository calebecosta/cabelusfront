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
import ListPageHeading from '../../../containers/cliente/ListPageHeading';

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import UserCardBasic from '../../../containers/cliente/UserCardBasic';

import api from '../../../services/api';

const FormStand = ({ match, intl }) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [dataApi, setDataApi] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);


  const [cliente, setAgendamentos] = useState([]);


  const startIndex =
    currentPage === 1 ? 1 : (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const pageSizes = [8, 12, 20];

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };


  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/cliente`);

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
      api.delete(`/cliente/${deleteId}`).then((i) => {
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
        <ModalBody>Tem certeza que deseja remover este Cliente?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => remover()}>
            Sim, com certeza
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Não
          </Button>
        </ModalFooter>
      </Modal>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="menu.clientes"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        </div>
      <Row>
        {cliente.map((itemData) => {
          return (
            <Colxx xxs="12" md="6" lg="4" key={`friend_${itemData.id}`}>
              <UserCardBasic  data={itemData} deleteCallback={deletarUsuario} />
            </Colxx>
          );
        })}
      </Row>
    </>
  );
};

export default injectIntl(FormStand);
