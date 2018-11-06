import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { Filter, Restaurant } from 'actions';
import ModalTitle from './ModalTitle';
import ModalContents from './ModalContents';
import Button from './Button';

const ModalWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ModalContainer = ({
  searchMethod, selected, styleToggler, methodToggler, modalToggler, currentLocation, dispatch, filter
}) => {

  function onSearchHandler() {
    dispatch(Filter.updateFilter(searchMethod));

    return dispatch(Restaurant.searchRestaurant({
      keyword: searchMethod,
      latitude: currentLocation.lat,
      longitude: currentLocation.lng
    }));
  }
  console.log(filter);
  return (
    <ModalWrapper>
      <ModalTitle modalToggler={modalToggler} />
      <ModalContents
        styleToggler={styleToggler}
        selected={selected}
        methodToggler={methodToggler}
        searchMethod={searchMethod}
    />
      <Button onClick={onSearchHandler} >
      Search
      </Button>
    </ModalWrapper>
  );
};

const EnhancedModalContainer = compose(
  connect(state => ({
    filter: state.Filter
  })),
  withState('selected', 'setSelected', 'Sort'),
  withState('searchMethod', 'setSearchMethod', []),
  withHandlers({
    styleToggler: ({ setSelected }) => (current) => {
      setSelected(current);
    },
    methodToggler: ({ setSearchMethod, searchMethod }) => (method) => {

      if (searchMethod.indexOf(method) > -1) { // When user's clicked a filter twice
        const newList = searchMethod.filter(item => item !== method);

        setSearchMethod([...newList]);
      } else {
        setSearchMethod([...searchMethod, method]);
      }
    },
    resetState: ({ setSelected, setSearchMethod }) => () => {
      setSelected('');
      setSearchMethod('');
    }
  })
)(ModalContainer);
export default EnhancedModalContainer;
