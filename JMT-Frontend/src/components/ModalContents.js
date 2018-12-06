import React from 'react';
import styled from 'styled-components';
import { categories } from 'constants';
import FilterSubCategory from './FilterSubCategory';

const ContentsWrapper = styled.div`
  display: flex;
  padding-top: 5%;
  flex: 1;
  margin-bottom:auto;
`;

const FilterParamWrapper = styled.div`
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


const ModalContents = ({
  searchParam,
  selected,
  filterToggler,
  styleToggler
}) => {
  return (
    <ContentsWrapper>
      <FilterParamWrapper>
        <NavigationWrapper> {/** Menu Tab Rendering  */}
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
        {/** Sub Menu Rendering */}
        <FilterSubCategory
          categories={categories}
          selected={selected}
          searchParam={searchParam}
          filterToggler={filterToggler}
        />
      </FilterParamWrapper>
    </ContentsWrapper>
  );
};

export default ModalContents;
