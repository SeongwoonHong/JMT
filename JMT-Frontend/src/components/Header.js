import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import { connect } from 'react-redux';
import { App, Restaurant } from 'actions';
import Search from 'components/Search';

class Header extends Component {
  state = {
    searchValue: ''
  }

  toggleView = (view) => {
    const { dispatch } = this.props;

    return dispatch(App.toggleView(view));
  }

  searchKeyDown = (e) => {
    const { dispatch } = this.props;
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

      dispatch(Restaurant.searchRestaurant(value.trim(), 'finch station')); // hard coded location value for now

      return this.initializeSearchValue();
    }
  }

  searchChange = (e) => {
    return this.setState({ searchValue: e.target.value });
  }

  initializeSearchValue = () => this.setState({ searchValue: '' });

  render() {
    const { view } = this.props;
    const { searchValue } = this.state;

    return (
      <StyledHeader>
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
                borderBottomLeftRadius: '5px',
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
                borderBottomRightRadius: '5px',
              }}
            >
              List
            </StyledSpan>
          </div>
        </StyledHeaderTopText>
        <StyledHeaderMiddleText>North York</StyledHeaderMiddleText>
        <StyledHeaderBottomText>
          <Search
            value={searchValue}
            onKeyDown={this.searchKeyDown}
            onChange={this.searchChange}
          />
          <div>filter</div>
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
    box-shadow: 0 0 0 1px rgba(34,36,38,.35) inset, 0 0 0 0 rgba(34,36,38,.15) inset !important;
  }

  &:active {
    box-shadow: 0 0 0 1px rgba(0,0,0,.15) inset, 0 1px 4px 0 rgba(34,36,38,.15) inset !important;
  }
`;

export default connect(state => ({
  view: state.App.view,
}))(Header);
