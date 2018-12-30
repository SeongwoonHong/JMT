import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';
import history from 'utils/history';
import { SelectionIndicators, Button, Header } from 'components';

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

    return (
      <StyledHome>
        <Header />
        <StyledContent>
          {
            progressSections[currentIndex].content
          }
        </StyledContent>
        <SelectionIndicators
          className="selectionIndicators"
          progressSections={progressSections}
          currentIndex={currentIndex}
          onClick={index => this.setCurrentIndex(index)}
        />
        <Button
          className="btn-home"
          onClick={() => history.push('/main/categories')}
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
`;

const StyledContent = styled.div`
  color: ${colors.theme};
  font-size: 32px;
  text-align: center;
  margin-top: 70px;
`;
