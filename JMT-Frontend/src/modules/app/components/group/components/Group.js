import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Group as GroupAction } from 'actions';
import { Redirect } from 'react-router-dom';
import { Loader } from 'components';
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
      notInGroup: false,
      comments: [],
      targetComment: {},
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    dispatch(GroupAction.checkUserGroup(id))
      .then((res) => {
        if (!this.findUserInGroup(res.payload)) {
          this.setState({ notInGroup: true });
        } else {
          dispatch(GroupAction.getGroup(id));
        }
        return axios.get(`/api/comments?&groupId=${id}`);
      })
      .then((response) => {
        this.setState({ comments: response.data || [] });
      });
  };

  findUserInGroup(users) {
    return users.some(e => e.userId === this.props.user.userId);
  };

  onCommentReply(targetComment) {
    this.setState({ targetComment }, () => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  onCommentSubmit(comment = '') {
    axios
      .post('/api/comments', {
        depth: this.state.targetComment.hasOwnProperty('depth')
          ? this.state.targetComment.depth + 1
          : 0,
        groupId: this.state.id,
        message: comment.trim(),
        parentId: this.state.targetComment.id || null,
        userId: this.props.user.userId
      })
      .then((response) => {
        this.setState({
          comments: [
            ...this.state.comments.map((comment) => {
              return {
                ...comment,
                children: this.state.targetComment.id === comment.id
                  ? comment.children.concat(response.data.id)
                  : comment.children,
              };
            }),
            {
              children: [],
              displayName: this.props.user.displayName,
              depth: this.state.targetComment.hasOwnProperty('depth')
                ? this.state.targetComment.depth + 1
                : 0,
              id: response.data.id,
              message: response.data.message,
              userId: this.props.user.userId,
            }
          ],
          targetComment: {}
        }, () => {
          window.scrollTo(
            0,
            document.getElementById(`comments-${response.data.id}`).offsetTop
          );
        });
      });
  }

  render() {
    const {
      group: { activeGroup },
      user,
    } = this.props;
    const { notInGroup } = this.state;

    if (notInGroup) return <Redirect to={{ pathname: '/404' }} />;
    if (!activeGroup.id || !user.userId) return <Loader />;

    return (
      <StyledGroup>
        <RestaurantDetail
          activeGroup={activeGroup}
          fromGroupPage
        />
        <CommentList
          comments={this.state.comments}
          onCommentReply={this.onCommentReply.bind(this)}
        />
        <CommentForm
          targetCommentUser={this.state.targetComment.displayName}
          onSubmit={this.onCommentSubmit.bind(this)}
        />
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
