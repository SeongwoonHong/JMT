import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { colors } from '../utils/colors';

const SubCategory = styled.div`
  flex: 1;
  padding: 5% 2%;
  display: flex;
  flex-direction: column;
`;

const SubItem = styled.div`
  flex: 1;
  font-size: 1.1rem;
  padding: 3.5% 0px;

  color: ${props => props.searchMethod.indexOf(props.item) > -1 || props.filtered.indexOf(props.item) > -1 ? 'red' : ''}

  :hover {
    color: ${colors.theme};
    transition: all 0.5s;
  }
`;


const FilterSubCategory = ({
  categories, selected, searchMethod, methodToggler, filter
}) => {
  return (
    <SubCategory>
      {
      categories
      .filter(({ name }) => name.toLowerCase() === selected.toLowerCase())
      .map(
        ({ name, subItems }) => (
          <div key={name}>
            {subItems.map(item => (
              <SubItem
                key={item}
                onClick={() => methodToggler(item)}
                searchMethod={searchMethod}
                item={item}
                filtered={filter && filter.data}

              >
                {item}
              </SubItem>
              )
          )}
          </div>
        )
      )
    }
    </SubCategory>
  );

};

export default connect(state => ({ filter: state.Filter }))(FilterSubCategory);