import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils/colors';

class Categories extends Component {
  renderCategories = () => {
    const { categories } = this.props;

    return categories.map((category) => {
      return (
        <StyledCategory key={category.title}>
          {category.title}
        </StyledCategory>
      );
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderCategories()}
      </div>
    );
  }
}

export default Categories;

const StyledCategory = styled.span`
  border-radius: 12px;
  background-color: ${colors.lightTheme};
  color: ${colors.white};
  text-align: center;
  padding: 3px 13px;
  margin-right: 5px;
`;
