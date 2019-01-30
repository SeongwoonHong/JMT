import React, { Component } from 'react';
import styled from 'styled-components';
import { MaterialIcon } from 'components';
import cx from 'classnames';
import { colors } from 'constants';
import getProfileUrl from 'utils/profile-url';
import { connect } from 'react-redux';

import MyList from './MyList';
import Message from './Message';
import Profile from './Profile';

const menus = [
  {
    index: 0,
    name: 'My List',
    icon: 'list_alt',
  },
  {
    index: 1,
    name: 'Profile',
    icon: 'account_box',
  },
  {
    index: 2,
    name: 'Message',
    icon: 'message'
  },
  {
    index: 3,
    name: 'Log Out',
    icon: 'lock_open',
  },
];

@connect(state => ({
  user: state.Auth.user,
}))
class MyAccount extends Component {
  state = {
    currentIndex: 0,
  }

  setIndex = (index) => {
    return this.setState({ currentIndex: index });
  }

  renderTabBody = (currentIndex) => {
    switch (currentIndex) {
      case 0:
        return <MyList />;
      case 1:
        return <Profile />;
      case 2:
        return <Message />;
      default:
        return null;
    }
  }

  render() {
    const { currentIndex } = this.state;
    const { profilePicture, displayName } = this.props.user;

    return (
      <StyledMyAccount>
        <StyledImagePreview>
          <img src={getProfileUrl(profilePicture)} alt="" />
          <div>{displayName}</div>
        </StyledImagePreview>

        <StyledMenuContainer>
          {
            menus.map((menu) => {
              return (
                <StyledMenu
                  onClick={() => this.setIndex(menu.index)}
                  key={menu.name}
                  className={cx({ isSelected: currentIndex === menu.index })}
                >
                  <MaterialIcon name={menu.icon} />
                  <StyledMenuText className="menu-text">{menu.name}</StyledMenuText>
                </StyledMenu>
              );
            })
          }
        </StyledMenuContainer>
        <StyledTabBodyContainer>
          {this.renderTabBody(currentIndex)}
        </StyledTabBodyContainer>
      </StyledMyAccount>
    );
  }
}

export default MyAccount;

const StyledMyAccount = styled.div`
  
`;

const StyledImagePreview = styled.div`
  margin-top: 10px;
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: block;
    margin: 5px auto;
  }
`;

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  text-align: center;
  cursor: pointer;

  &.isSelected {
    border-bottom: 3px solid ${colors.lightTheme};

    .material-icons,
    .menu-text {
      color: ${colors.lightTheme};
    }
  }
`;

const StyledMenuText = styled.div`
  margin-bottom: 10px;
`;

const StyledTabBodyContainer = styled.div`
  padding: 20px;
`;

