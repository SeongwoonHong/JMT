import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { App } from 'actions';
import ModalTitle from './ModalTitle';
import ModalContents from './ModalContents';
import Button from './Button';

const ModalWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ModalContainer = ({
  searchParam, selected, styleToggler, filterToggler, modalToggler, dispatch, app
}) => {

  function onSearchHandler() {
    dispatch(App.updateFilter(searchParam));

    return modalToggler();
  }

  return (
    <ModalWrapper>
      <ModalTitle modalToggler={modalToggler} />
      <ModalContents
        styleToggler={styleToggler}
        selected={selected}
        filterToggler={filterToggler}
        searchParam={searchParam}
    />
      <Button onClick={onSearchHandler} >
      Search
      </Button>
    </ModalWrapper>
  );
};

export default connect(state => ({
  app: state.App
}))(ModalContainer);

