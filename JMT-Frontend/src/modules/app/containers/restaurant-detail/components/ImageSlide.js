import React, { Component } from 'react';
import styled from 'styled-components';

class ImageSlide extends Component {
  render() {
    const { images, currentIndex } = this.props;

    return (
      <StyledImageSlide {...this.props}>
        {
          images.map((img, index) => {
            return (
              <StyledImage
                src={img}
                key={img}
                isActive={currentIndex === index}
              />
            );
          })
        }

      </StyledImageSlide>
    );
  }
}

export default ImageSlide;

const StyledImageSlide = styled.div`
  width: 100%;
  height: 250px;
  position: relative;  
`;

const StyledImage = styled.img`
  opacity: ${props => props.isActive ? 1 : 0};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 1s ease-out;
`;
