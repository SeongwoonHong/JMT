import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { App } from 'actions';
import { toast } from 'react-toastify';
import history from 'utils/history';
import ModalTitle from './ModalTitle';
import ModalContents from './ModalContents';
import Button from './Button';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const ModalContainer = ({
  searchParam, selected, styleToggler, filterToggler, modalToggler, dispatch, location, modalClose
}) => {

  /**
   * @param {string} param
   * returns a string from url query string corresponding to param being passed
   */
  function getParamsFromURL(param) {
    const params = new URLSearchParams(location.search);

    return params.get(param);
  }

  function onSearchHandler() {
    const locationQuery = getParamsFromURL('location');
    const latitude = getParamsFromURL('latitude');
    const longitude = getParamsFromURL('longitude');
    let url = '';

    if (!searchParam.cuisines) {
      toast.info('You need to select at least one cuisine');
    }

    dispatch(App.updateFilter(searchParam));

    if (searchParam.cuisines && searchParam.cuisines.length) {
      url += `/main/restaurant-list?cuisines=${searchParam.cuisines.join(',')}`;
    } else {
      return false; // TODO - when a user did not select any cuisine in filter modal
    }

    if (locationQuery) {
      url += `&location=${locationQuery}`;
    } else {
      url += `&latitude=${latitude}&longitude=${longitude}`;
    }

    if (searchParam.sort) {
      url += `&sort_by=${searchParam.sort}`;
    }

    if (searchParam.price) {
      url += `&price=${searchParam.price.join(',')}`;
    }

    modalToggler();
    return history.push(url);
  }

  return (
    <ModalWrapper>
      <ModalTitle modalClose={modalClose} title="FILTER" />
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
}))(withRouter(ModalContainer));

