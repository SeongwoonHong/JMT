import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import TransitionGroup from 'react-transition-group-plus';
import { Comment } from 'components';

class Comments extends Component {
  render() {
    const { comments } = this.props;

    return (
      <StyledRestaurantList>
        <TransitionGroup>
          {comments.length > 0
            ? comments.map((comment, index) => {
                return (
                  <Comment
                    data={comment}
                    key={comment.id}
                    delay={index / comments.length}
                    shouldAnimate
                    isSmallView
                  />
                );
              })
            : null // Loader goes here
          }
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
