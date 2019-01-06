import React, { Component } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { colors } from 'constants';

class SelectionIndicators extends Component {
  render() {
    const {
      progressSections,
      currentIndex,
      className,
      onClick
    } = this.props;

    return (
      <StyledContainer className={className}>
        {
          progressSections.map((progress, i) => {
            return (
              <StyledButton
                key={progress.id}
                onClick={() => onClick(i)}
                className={cx('indicator', {
                  selected: i <= currentIndex,
                  current: progress.id === currentIndex
                })}
              />
            );
          })
        }
      </StyledContainer>
    );
  }
}

export default SelectionIndicators;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledButton = styled.button`
  width: 8px;
  height: 8px;
  background-color: ${colors.lightGrey};
  border-radius: 50%;
  margin: 0px 8px;
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s ease-out, background 0.3s ease-out;

  &.selected {
    background-color: ${colors.grey};
  }

  &.current {
    transform: scale(1.3);
  }
`;
