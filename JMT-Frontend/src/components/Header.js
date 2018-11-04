import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { App, Restaurant } from 'actions';
import Search from 'components/Search';
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
    bottom: '20%',
    display: 'flex'
  }
};

@connect(state => ({
  view: state.App.view
}))
class Header extends Component {
  state = {
    searchValue: '',
    isModalOpen: false
  };

  getCurrentLocationText = () => {
    const { currentLocation } = this.props;

    return currentLocation.isUserAllowed ? 'Current Location' : 'Toronto'; // it's toronto by default
  };

  modalToggler = () => this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));

  toggleView = (view) => {
    const { dispatch } = this.props;

    return dispatch(App.toggleView(view));
  };

  searchKeyDown = (e) => {
    const { dispatch, currentLocation } = this.props;
    const { value } = e.target;
    const esc = 27;
    const enter = 13;

    if (e.keyCode === esc) {
      return this.initializeSearchValue();
    }
    if (e.keyCode === enter) {
      if (value.trim() === '') {
        return false;
      }

      dispatch(Restaurant.searchRestaurant({
        keyword: value,
        latitude: currentLocation.lat,
        longitude: currentLocation.lng
      }));

      return this.initializeSearchValue();
    }
  };

  searchChange = (e) => {
    return this.setState({ searchValue: e.target.value });
  };

  initializeSearchValue = () => this.setState({ searchValue: '' });

  render() {
    const { view } = this.props;
    const { searchValue, isModalOpen } = this.state;

    return (
      <StyledHeader>
        <Modal isOpen={isModalOpen} style={modalStyle} ariaHideApp={false}>
          <ModalContainer modalToggler={this.modalToggler} />
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
          Icon {this.getCurrentLocationText()}
        </StyledHeaderMiddleText>
        <StyledHeaderBottomText>
          <Search
            value={searchValue}
            onKeyDown={this.searchKeyDown}
            onChange={this.searchChange}
          />
          <div onClick={this.modalToggler}>filter</div>
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
