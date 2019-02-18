import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Group as GroupAction } from 'actions';
import { Redirect } from 'react-router-dom';
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
      id: params.get('id'),
      notInGroup: false
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    dispatch(GroupAction.checkUserGroup(id)).then((res) => {
      if (!this.findUserInGroup(res.payload)) {
        this.setState({ notInGroup: true });
      } else dispatch(GroupAction.getGroup(id));
    });
  };

  findUserInGroup = users =>
    users.some(e => e.userId === this.props.user.userId);

  render() {
    const {
      group: { activeGroup },
      user
    } = this.props;
    const { notInGroup } = this.state;

    if (notInGroup) return <Redirect to={{ pathname: '/404' }} />;
    if (!activeGroup.id || !user.userId) return null;

    return (
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
`;
