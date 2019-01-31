import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Group as GroupAction } from 'actions';
import RestaurantDetail from '../../restaurant-detail';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

@connect(state => ({
  group: state.Group,
  user: state.Auth.user
}))
class Group extends Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const params = new URLSearchParams(location.search);

    this.state = {
      id: params.get('id')
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    return dispatch(GroupAction.getGroup(id));
  };

  render() {
    const {
      group: { activeGroup }
    } = this.props;

    return !activeGroup.id ? null : (
      <StyledGroup>
        <RestaurantDetail activeGroup={activeGroup} fromGroupPage />
        <CommentList />
        <CommentForm />
      </StyledGroup>
    );
  }
}

export default Group;

const StyledGroup = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  .selectionIndicators {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
  }

  .btn-home {
    position: absolute;
    bottom: 20px;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
