import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants';

const Circle = ({ percentage }) => (
  <StyledOuter>
    <StyledMask>
      <StyledMaskRating percentage={percentage} />
    </StyledMask>
  </StyledOuter>
);

export default class RatingCircle extends React.Component {
  renderCircles = () => {
    const { rating } = this.props;
    const fullCircle = Math.floor(rating);
    const dynamicCircle = rating - fullCircle;
    const emptyCircle = 5 - Math.ceil(rating);
    const circles = [];

    for (let full = 0; full < fullCircle; full += 1) {
      circles.push(<Circle key={`full-${full}`} percentage={100} />);
    }
    if (dynamicCircle > 0) {
      circles.push(<Circle key={`dynamicCircle-${dynamicCircle}`} percentage={dynamicCircle * 100} />);
    }
    for (let empty = 0; empty < emptyCircle; empty += 1) {
      circles.push(<Circle key={`empty-${empty}`} percentage={0} />);
    }

    return circles;
  }

  render() {
    return (
      <StyledRatingContainer {...this.props}>
        {
          this.renderCircles()
        }
      </StyledRatingContainer>
    );
  }
}

const StyledRatingContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledOuter = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid ${colors.lightTheme};
  background-color: ${colors.white};
  position: relative;
  display: inline-block;
  margin-right: 2px;
`;

const StyledMask = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 85%;
  height: 85%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledMaskRating = styled.div`
  width: ${props => `${props.percentage}%`};
  height: 100%;
  background-color: ${colors.lightTheme};
`;
