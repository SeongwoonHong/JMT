import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import ModalTitle from './ModalTitle';
import ModalContents from './ModalContents';

const ModalWrapper = styled.div`
  flex: 1;
  // border: 3px red solid;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const Enhanced = compose(
  connect(),
  withState('selected', 'setSelected', 'Sort'),
  withState('searchMethod', 'setSearchMethod', ''),
  withHandlers({
    styleToggler: ({ setSelected }) => (current) => {
      setSelected(current);
    },
    methodToggler: ({ setSearchMethod }) => (method) => {
      setSearchMethod(method);
    }
  })
)(({
  searchMethod, selected, styleToggler, methodToggler, modalToggler
}) => (
  <ModalWrapper>
    <ModalTitle modalToggler={modalToggler} />
    <ModalContents
      styleToggler={styleToggler}
      selected={selected}
      methodToggler={methodToggler}
      searchMethod={searchMethod}
    />
    <ButtonWrapper>
      <div>Search!</div>
    </ButtonWrapper>
  </ModalWrapper>
));

export default Enhanced;
