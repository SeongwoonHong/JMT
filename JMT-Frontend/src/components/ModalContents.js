import React from 'react';
import styled from 'styled-components';
import FilterSubCategory from './FilterSubCategory';

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

const categories = [
  {
    name: 'Sort',
    subItems: ['Distance', 'Rating', 'Low to hight cost', 'High to low cost']
  },
  {
    name: 'Cusines',
    subItems: ['Cusines A', 'Cusines B', 'Cusines C', 'Cusines D']
  },
  {
    name: 'Cost',
    subItems: ['High to Low', 'Low to High']
  },

  {
    name: 'Ratings',
    subItems: ['3+', '4+', '5+']
  },
];


const ModalContents = ({
  searchMethod,
  selected,
  methodToggler,
  styleToggler
}) => {
  return (
    <ContentsWrapper>
      <FilterMethodWrapper>
        <NavigationWrapper>
          {
            categories.map(({ name }) => (
              <NavigationItem
                onClick={() => { styleToggler(name); }}
                selected={selected}
                name={name}
                key={name}
              >
                {name}
              </NavigationItem>
          ))}
        </NavigationWrapper>
        <FilterSubCategory
          categories={categories}
          selected={selected}
          searchMethod={searchMethod}
          methodToggler={methodToggler}
        />
      </FilterMethodWrapper>
    </ContentsWrapper>
  );
};

export default ModalContents;
