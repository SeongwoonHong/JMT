import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'constants';
import TransitionGroup from 'react-transition-group-plus';
import { Comment } from 'components';

class Comments extends Component {
  render() {
    const { comments } = this.props;

    return (
      <StyledRestaurantList>
        <TransitionGroup>
          {comments
            .filter(comment => comment.depth === 0)
            .map((comment, index) => {
              return (
                <Comment
                  comments={comments}
                  replies={comment.children || []}
                  data={comment}
                  key={comment.id}
                  delay={index / comments.length}
                  shouldAnimate
                  isSmallView
                />
              );
            })}
        </TransitionGroup>
      </StyledRestaurantList>
    );
  }
}

const StyledRestaurantList = styled.div`
  background-color: ${colors.lightPink};
  padding: 5px 10px;
`;

export default Comments;
