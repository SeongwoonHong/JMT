import React, { Component } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { colors } from 'utils/colors';

class SelectionIndicators extends Component {
  render() {
    const {
      progressSections,
      selectedIndex,
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
                  selected: i <= selectedIndex,
                  current: progress.id === selectedIndex
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

  &.selected {
    background-color: ${colors.grey};
  }

  &.current {
    width: 10px;
    height: 10px;
  }
`;
