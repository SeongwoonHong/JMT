import React, { Component } from 'react';
import history from 'utils/history';
import styled from 'styled-components';
import { colors } from 'utils/colors';

const categories = [
  {
    name: 'Resetaurants',
    route: '/main/restaurant-landing',
    isReady: true,
  },
  {
    name: 'Movies',
    route: '#',
    isReady: false,
  },
  {
    name: 'Bowling',
    route: '#',
    isReady: false,
  },
  {
    name: 'Biking',
    route: '#',
    isReady: false,
  },
  {
    name: 'Partying',
    route: '#',
    isReady: false,
  },
];
class Categories extends Component {
  onClickHandler = (route, isReady) => {
    if (!isReady) {
      return alert('Comming Soon. Stay tuned!'); // eslint-disable-line
    }

    return history.push(route);
  }

  render() {
    return (
      <StyledCategories>
        {
          categories.map((category) => {
            return (
              <StyledCategory onClick={() => this.onClickHandler(category.route, category.isReady)}>
                <StyledText>
                  { category.name }
                </StyledText>
              </StyledCategory>
            );
          })
        }
      </StyledCategories>
    );
  }
}

export default Categories;

const StyledCategories = styled.div`
  
`;

const StyledCategory = styled.div`
  height: 70px;
  background-color: ${colors.teal};
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const StyledText = styled.div`
  color: ${colors.white};
`;
