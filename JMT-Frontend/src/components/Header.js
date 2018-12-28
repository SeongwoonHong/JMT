import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { App, Restaurant } from 'actions';
import { withRouter } from 'react-router-dom';
import { Search, SVGContainer } from 'components';
import locationSVG from 'assets/location.svg';
import filterSVG from 'assets/filter.svg';

import ModalContainer from './ModalContainer';

const modalStyle = {
  overlay: {
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  content: {
    borderRadius: '10px',
    top: '20%',
    left: '0%',
    right: '0%',
    bottom: 'auto',
    display: 'flex'
  }
};

@connect(state => ({
  view: state.App.view,
  filter: state.App.filter,
}))
@withRouter
class Header extends Component {
  state = {
    searchValue: '',
    isModalOpen: false,
    selected: 'Sort',
    searchParam: this.props.filter || {}
  };

  filterToggler = (category, param) => {
    const { searchParam } = this.state;
    let newSearchParam = { ...searchParam };

    if (category === 'sort') {
      newSearchParam.sort = newSearchParam.sort === param ? '' : param;
    } else if (!newSearchParam[category]) {
      newSearchParam[category] = [param];
    } else if (newSearchParam[category].indexOf(param) > -1) {
      newSearchParam = {
        ...searchParam,
        [category]: searchParam[category].filter(item => item !== param),
      };
    } else {
      newSearchParam[category].push(param);
    }

    return this.setState({ searchParam: newSearchParam });
  }

  styleToggler = current => this.setState({ selected: current })

  modalToggler = () => this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));

  modalClose = () => {
    return this.setState({ searchParam: this.props.filter }, () => {
      this.modalToggler();
    });
  }

  toggleView = (view) => {
    const { dispatch } = this.props;

    return dispatch(App.toggleView(view));
  };

  searchKeyDown = (e) => {
    const {
      // restaurantLocation,
      // latitude,
      // longitude,
      dispatch,
    } = this.props;
    const { value } = e.target;
    const esc = 27;

    if (e.keyCode === esc) {
      return this.initializeSearchValue();
    }

    if (this.lastRequestId) clearTimeout(this.lastRequestId);

    if (value.length >= 2) {
      this.lastRequestId = setTimeout(async () => {
        const data = await dispatch(Restaurant.getRestaurantAutocomplete({ keyword: value }));
        console.log(data);
      }, 1500);
    }

    return false;
  };

  searchChange = (e) => {
    return this.setState({ searchValue: e.target.value });
  };

  initializeSearchValue = () => this.setState({ searchValue: '' });

  render() {
    const { view, restaurantLocation } = this.props;
    const {
      searchValue, isModalOpen, selected, searchParam
    } = this.state;

    return (
      <StyledHeader>
        <Modal isOpen={isModalOpen} style={modalStyle}>
          <ModalContainer
            modalToggler={this.modalToggler}
            modalClose={this.modalClose}
            selected={selected}
            searchParam={searchParam}
            styleToggler={this.styleToggler}
            filterToggler={this.filterToggler}
          />
        </Modal>
        <StyledHeaderTopText>
          <div>Find Restaurants</div>
          <div>
            <StyledSpan
              onClick={() => this.toggleView('map')}
              style={{
                boxShadow: view !== 'map' && '0 0 0 1px lightgrey inset',
                backgroundColor: view === 'map' && colors.theme,
                color: view === 'map' && 'white',
                borderTopLeftRadius: '5px',
                borderBottomLeftRadius: '5px'
              }}
            >
              Map
            </StyledSpan>
            <StyledSpan
              onClick={() => this.toggleView('list')}
              style={{
                boxShadow: view !== 'list' && '0 0 0 1px lightgrey inset',
                backgroundColor: view === 'list' && colors.theme,
                color: view === 'list' && 'white',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px'
              }}
            >
              List
            </StyledSpan>
          </div>
        </StyledHeaderTopText>
        <StyledHeaderMiddleText>
          <SVGContainer svg={locationSVG} />{restaurantLocation}
        </StyledHeaderMiddleText>
        <StyledHeaderBottomText>
          <Search
            value={searchValue}
            onKeyDown={this.searchKeyDown}
            onChange={this.searchChange}
          />
          <SVGContainer
            svg={filterSVG}
            onClick={this.modalToggler}
          />
        </StyledHeaderBottomText>
      </StyledHeader>
    );
  }
}

const StyledHeader = styled.div`
  background-color: ${colors.white};
  padding: 20px;
`;

const StyledHeaderTopText = styled.div`
  font-weight: bold;
  font-size: 23px;
  display: flex;
  justify-content: space-between;
`;

const StyledHeaderMiddleText = styled.div`
  margin-top: 10px;
  border: none;
`;

const StyledHeaderBottomText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
}
`;

const StyledSpan = styled.span`
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.35) inset,
      0 0 0 0 rgba(34, 36, 38, 0.15) inset !important;
  }

  &:active {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15) inset,
      0 1px 4px 0 rgba(34, 36, 38, 0.15) inset !important;
  }
`;

export default Header;
