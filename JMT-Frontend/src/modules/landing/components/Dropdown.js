import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'components';
import { colors } from 'utils/colors';
import animate from 'gsap-promise';

const contentHeight = '375px';

class Dropdown extends Component {
  state = {
    selectedItem: this.props.items[1]
  };

  componentDidMount = () => {
    animate.set(this.background, { autoAlpha: 0 });
    animate.set(this.content, { y: contentHeight });
  }

  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }

  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }

  componentWillLeave = (done) => {
    this.animateOut().then(done);
  }

  animateIn = () => {
    animate.to(this.background, 0.5, { autoAlpha: 1, ease: Expo.easeOut });

    return animate.to(this.content, 1.5, { y: '0px', ease: Expo.easeOut });
  }

  animateOut = () => {
    animate.to(this.background, 0.5, { autoAlpha: 0, ease: Expo.easeOut });

    return animate.to(this.content, 1.5, { y: contentHeight, ease: Expo.easeOut });
  }

  renderItems = () => {
    const { selectedItem } = this.state;
    const { items } = this.props;

    return items.map((item) => {
      return (
        <StyledItem
          key={item}
          onClick={() => this.setState({ selectedItem: item })}
          isSelected={selectedItem === item}
        >
          <StyledText>{ item }</StyledText>
        </StyledItem>
      );
    });
  }

  render() {
    const { selectedItem } = this.state;
    const { className, onClickHandler, mode } = this.props;

    return (
      <StyledDropdown className={className}>
        <StyledBackgroundOverlay innerRef={el => this.background = el} />
        <StyledContent innerRef={el => this.content = el}>
          <StyledItemContainer>
            { this.renderItems() }
          </StyledItemContainer>
          <Button
            onClick={() => onClickHandler(mode, selectedItem)}
            className="button"
          >
            { selectedItem }
          </Button>
        </StyledContent>
      </StyledDropdown>
    );
  }
}

export default Dropdown;

const StyledDropdown = styled.div`
  border-radius: 10px;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StyledContent = styled.div`
  z-index: 12;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  border-radius: 10px;

  .button {
    width: 90%;
    margin: 18px auto;
  }
`;

const StyledItemContainer = styled.div`
  height: 200px;
  overflow-y: scroll;
  padding: 10px 0px;
`;

const StyledItem = styled.div`
  color: ${props => props.isSelected ? colors.black : colors.lightGrey};
  border-top: ${props => props.isSelected && '1px solid black'};
  border-bottom: ${props => props.isSelected && '1px solid black'};
  font-size: ${props => props.isSelected ? '18px' : '16px'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.div`
  margin: 10px auto;
`;

const StyledBackgroundOverlay = styled.div`
  background-color: ${colors.backgroundOverlay};
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
