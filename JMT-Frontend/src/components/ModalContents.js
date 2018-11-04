import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/colors';

const ContentsWrapper = styled.div`
  flex: 1;
  display: flex;
  padding-top: 5%;
`;

const FilterMethodWrapper = styled.div`
  flex: 1;
`;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -2px 0px lightgrey inset;
`;

const NavigationItem = styled.div`
  min-width: min-content;
  font-size: 1.3rem;
  border-bottom: ${({ selected, name }) =>
    (selected === name ? '3px red solid' : null)};
  font-weight: ${({ selected, name }) => (selected === name ? 'bold' : null)};
  color: ${({ selected, name }) => (selected === name ? 'black' : 'grey')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1% 0px;
`;

const SubCategory = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 5% 2%;
  // border: 3px black solid;
`;

const SubItem = styled.div`
  flex: 1;
  font-size: 1.1rem;
  padding: 3.5% 0px;

  :hover {
    color: ${colors.theme};
    transition: all 0.5s;
  }
`;

const ModalContents = ({
  searchMethod,
  selected,
  methodToggler,
  styleToggler
}) => (
  <ContentsWrapper>
    <FilterMethodWrapper>
      <NavigationWrapper>
        {['Sort', 'Cusines', 'Cost', 'Rating'].map(item => (
          <NavigationItem
            onClick={() => {
              styleToggler(item);
            }}
            selected={selected}
            name={item}
            key={item}
          >
            {item}
          </NavigationItem>
        ))}
      </NavigationWrapper>
      <SubCategory>
        {['Distance', 'Rating', 'Low to high cost', 'High to low cost'].map(
          item => (
            <SubItem
              key={item}
              searchMethod={searchMethod}
              onClick={() => methodToggler(item)}
            >
              {item}
            </SubItem>
          )
        )}
      </SubCategory>
    </FilterMethodWrapper>
  </ContentsWrapper>
);

export default ModalContents;
