import React, { Component } from 'react';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import cx from 'classnames';
import { colors, headerHeight } from 'constants';
import history from 'utils/history';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'actions';
import { connect } from 'react-redux';

const routesToHideHamburgerMenu = ['/login', '/signup', '/forgot-password', '/email-verified'];
@withRouter
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

  shouldHamburgerMenuHide = () => routesToHideHamburgerMenu.includes(this.props.location.pathname);

  render() {
    const { isMenuOpened } = this.state;
    const { user } = this.props;

    return (
      <StyledHeader>
        <StyledHamburger
          className={cx({ isMenuOpened })}
          onClick={this.toggleHamburger}
          hideHamburgerMenu={this.shouldHamburgerMenuHide()}
        >
          <span />
          <span />
          <span />
        </StyledHamburger>
        <StyledLogo
          src={logo}
          alt=""
          onClick={() => history.push('/')}
        />
        <StyledMenuContainer isMenuOpened={isMenuOpened}>
          <StyledMenu className="header-menu">
            <StyledDiv className="menu-items">
              <Link to="/" className="menu-item">Home</Link>
              {
                user ?
                  <div>
                    <Link to="/main/user/my-account" className="menu-item" onClick={() => this.setState({ isMenuOpened: false })}>My Account</Link>
                    <div onClick={this.logout} className="menu-item">Log out</div>
                  </div>
                  :
                  <div>
                    <Link
                      to={{
                        pathname: '/login',
                        state: {
                          prevRoute: this.props.location.pathname + this.props.location.search
                        }
                      }}
                      className="menu-item"
                    >
                      Log in
                    </Link>
                    <Link
                      to={{
                        pathname: '/signup',
                        state: {
                          prevRoute: this.props.location.pathname + this.props.location.search
                        }
                      }}
                      className="menu-item"
                    >
                      Sign up
                    </Link>
                  </div>
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
  cursor: pointer;
`;

const StyledHamburger = styled.div`
  display: ${props => props.hideHamburgerMenu ? 'none' : 'block'};
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
  visibility: ${props => props.isMenuOpened ? 'initial' : 'hidden'};
  position: relative;

  ${props => props.isMenuOpened && `
    .header-menu {
      width: 45%;
    }

    .menu-items {
      display: block;
    }
  `};
`;

const StyledMenu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 0%;
  height: 100vh;
  background-color: ${colors.lightBlue};
  z-index: 3;
  text-transform: uppercase;
  transition: all 0.3s ease-out;
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
  display: none;
  white-space: nowrap;
  margin: 100px 40px;
`;

const StyledBackgroundOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${colors.backgroundOverlay};
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;
