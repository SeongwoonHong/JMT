import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'constants';
import { Button, Header } from 'components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const progressSections = [
  {
    id: 0,
    content: 'Shall we go eat?',
  },
  {
    id: 1,
    content: 'Make friends!',
  },
  {
    id: 2,
    content: "Let's eat together",
  }
];


class Home extends Component {
  state = {
    currentIndex: 0,
  };

  setCurrentIndex = (index) => {
    return this.setState({ currentIndex: index });
  }

  render() {
    const { currentIndex } = this.state;
    const sliderSettings = {
      dots: true,
      infinite: false,
      afterChange: current => this.setState({ currentIndex: current })
    };

    return (
      <StyledHome>
        <Header />
        <Slider {...sliderSettings}>
          {
            progressSections.map((section, index) => {
              return (
                <StyledDiv
                  index={index}
                  currentIndex={currentIndex}
                  key={section.id}
                >
                  {section.content}
                </StyledDiv>
              );
            })
          }
        </Slider>
        <Button
          className="btn-home"
          to="/main/categories"
        >
          {
            currentIndex === progressSections.length - 1 ?
            "Let's go!"
            :
            'Skip'
          }
        </Button>
      </StyledHome>
    );
  }
}

export default Home;

const StyledHome = styled.div`
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

  .slick-slider {
    height: 70vh;

    .slick-dots li button:before {
      font-size: 9px;
    }
  }
`;

const StyledDiv = styled.div`
  height: 500px;
  text-align: center;
  width: 100%;
  color: ${colors.theme};
  font-size: 32px;
  margin-top: 70px;

  &:focus {
    outline: none;
  }
`;
