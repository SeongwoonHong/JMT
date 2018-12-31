import React, { Component } from 'react';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import cx from 'classnames';
import { colors } from 'utils/colors';
import { headerHeight } from 'constants';
import { Link } from 'react-router-dom';
import { Auth } from 'actions';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.Auth.user
}))
class Header extends Component {
  state = {
    isMenuOpened: false,
  };

  toggleHamburger = () => {
    return this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  logout = () => {
    const { dispatch } = this.props;

    this.setState({ isMenuOpened: false });

    return dispatch(Auth.logout());
  }

  render() {
    const { isMenuOpened } = this.state;
    const { user } = this.props;

    return (
      <StyledHeader>
        <StyledHamburger
          className={cx({ isMenuOpened })}
          onClick={this.toggleHamburger}
        >
          <span />
          <span />
          <span />
        </StyledHamburger>
        <StyledLogo src={logo} alt="" />
        <StyledMenuContainer isMenuOpened={isMenuOpened}>
          <StyledMenu>
            <StyledDiv>
              <Link to="/" className="menu-item">Home</Link>
              {
                user ?
                  <div>
                    <Link to="#" className="menu-item">My profile</Link>
                    <div onClick={this.logout} className="menu-item">Log out</div>
                  </div>
                  :
                  <Link to="/login" className="menu-item">Log in</Link>
              }
            </StyledDiv>
          </StyledMenu>
          <StyledBackgroundOverlay
            onClick={this.toggleHamburger}
          />
        </StyledMenuContainer>
      </StyledHeader>
    );
  }
}

export default Header;

const StyledHeader = styled.div`
  background-color: ${colors.lightTheme};
  position: relative;
  height: ${headerHeight}px;
  width: 100%;
`;

const StyledLogo = styled.img`
  width: 60px;
  height: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledHamburger = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  span {
    position: absolute;
    width: 100%;
    height: 3px;
    top: 50%;
    margin-top: -1px;
    left: 0;
    display: block;
    background: ${colors.white};
    transition: .5s;
    border-radius: 10px;
  }

  span:first-child {
    top: 3px;
  }

  span:last-child {
    top: 17px; 
  }      

  &:hover {
    cursor: pointer;
  }

  &.isMenuOpened { 
    span {
      opacity: 0;
      top: 50%;
    }

    span:first-child {
      opacity: 1;
      transform: rotate(405deg);
    }

    span:last-child {
      opacity: 1;
      transform: rotate(-405deg);
    }
  }
`;

const StyledMenuContainer = styled.div`
  display: ${props => props.isMenuOpened ? 'block' : 'none'};
  position: relative;
`;

const StyledMenu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 45%;
  height: 100vh;
  background-color: ${colors.lightBlue};
  z-index: 2;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 2px 0px 5px 0px rgba(0,0,0,0.35);

  .menu-item {
    padding: 20px 0px 10px 0px;
    color: ${colors.white};
    cursor: pointer;
    display: block;
    text-decoration: none;

    &:focus {
      outline: none;
    }
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  width: 100%;
`;

const StyledBackgroundOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${colors.backgroundOverlay};
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;
