import React from 'react';
import { Row } from 'reactstrap';
import Pagination from '../pages/Pagination';
import DataListView from './DataListView';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  deleteCallback,
  editCallback,
}) => {
  return (
    <Row>
      {items.map((agendamento) => {
        return (
          <DataListView
            key={agendamento.id}
            agendamento={agendamento}
            isSelect={selectedItems.includes(agendamento.id)}
            collect={collect}
            onCheckItem={onCheckItem}
            editCallback={editCallback}
            deleteCallback={deleteCallback}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
