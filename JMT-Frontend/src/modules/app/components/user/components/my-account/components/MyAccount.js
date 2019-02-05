import React, { Component } from 'react';
import styled from 'styled-components';
import { MaterialIcon, Button, ModalTitle, InputTextField } from 'components';
import Modal from 'react-modal';
import cx from 'classnames';
import { User } from 'actions';
import { colors } from 'constants';
import getProfileUrl from 'utils/profile-url';
import { connect } from 'react-redux';

import MyList from './MyList';
import Message from './Message';
import Profile from './Profile';

const modalStyles = {
  content: {
    top: '9vh',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '19vh',
    width: '82vw'
  },
  overlay: {
    opacity: 1,
    backgroundColor: colors.backgroundOverlay,
    zIndex: 2
  }
};

const menus = [
  {
    index: 0,
    name: 'Profile',
    icon: 'account_box',
  },
  {
    index: 1,
    name: 'My List',
    icon: 'list_alt',
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
    isModalOpen: false,
    profilePicture: getProfileUrl(this.props.user.profilePicture),
  }

  onFileChange = (e) => {
    const profilePicture = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(profilePicture);

    return reader.onload = () => {
      return this.setState({ profilePicture: reader.result });
    };
  }

  setIndex = (index) => {
    return this.setState({ currentIndex: index });
  }

  updateProfilePicture = () => {
    const { dispatch } = this.props;
    const { profilePicture } = this.state;

    if (profilePicture === getProfileUrl(this.props.user.profilePicture)) {
      return false;
    }

    return dispatch(User.updateProfilePicture(profilePicture));
  }

  closeModal = () => {
    return this.setState({ isModalOpen: false });
  }

  toggleModal = () => {
    return this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  renderTabBody = (currentIndex) => {
    switch (currentIndex) {
      case 0:
        return <Profile />;
      case 1:
        return <MyList />;
      case 2:
        return <Message />;
      default:
        return null;
    }
  }

  renderModal = () => {
    const { profilePicture } = this.state;

    return (
      <Modal
        isOpen={this.state.isModalOpen}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <ModalTitle modalClose={this.toggleModal} title="Update a Picture" />
        <div style={{ marginTop: '50px' }}>
          <StyledInputWrapper>
            <InputTextField
              name="profilePicture"
              type="file"
              accept="image/*"
              className="profilePicture-field"
              onChange={this.onFileChange}
            />
          </StyledInputWrapper>
          <StyledImagePreview>
            <img src={profilePicture} alt="" />
          </StyledImagePreview>
        </div>
        <Button style={{ marginTop: '20px' }} onClick={this.updateProfilePicture}>
          Save
        </Button>
      </Modal>
    );
  }

  render() {
    const { currentIndex, profilePicture } = this.state;
    const { displayName } = this.props.user;

    return (
      <StyledMyAccount>
        <StyledImagePreview>
          <StyledImageContainer>
            <MaterialIcon
              name="photo"
              onClick={this.toggleModal}
              className="photo"
            />
            <img src={profilePicture} alt="" />
          </StyledImageContainer>
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
        {this.renderModal()}
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
  }
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  display: block;
  margin: 5px auto;
  
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  .photo {
    position: absolute;
    bottom: 0;
    right: 0;
    color: ${colors.lightTheme};
    cursor: pointer;
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
  background-color: ${colors.lightPink};

  input {
    background-color: initial;
  }
`;

const StyledInputWrapper = styled.div`
  position: relative;
  margin-top: 30px;
`;
