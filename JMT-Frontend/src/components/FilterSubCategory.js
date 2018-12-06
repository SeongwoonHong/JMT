import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SubItemCuisines from './SubItemCuisines';
import SubItemPrice from './SubItemPrice';

const SubCategory = styled.div`
  flex: 1;
  padding: 5% 2%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CuisinesSubMenuWrapper = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  max-height: 310px; /* This line should be fixed */
`;

const SubItem = styled.div`
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.7rem;
  padding: 3.5% 0px;
  color: ${props => props.searchParam.sort === props.item ? 'red' : ''};
  transition: all 0.5s;
`;
const CostSubMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7% 0%;
`;

const FilterSubCategory = ({
  categories, selected, searchParam, filterToggler, app
}) => (
  <SubCategory>
    {
      categories
      .filter(({ name }) => name.toLowerCase() === selected.toLowerCase())
      .map(
        ({ name, subItems }) => {
          if (name === 'Cuisines') { /** User Clicked Cuisines Manu */
            return (
              <CuisinesSubMenuWrapper key={name} name={name}>
                {subItems.map(item => (
                  <SubItemCuisines
                    displaying={name === 'Cuisines'}
                    key={item}
                    item={item}
                    searchParam={searchParam}
                    filterToggler={filterToggler}
                    app={app}
                  />
                  ))
                }
              </CuisinesSubMenuWrapper>
            );
          } else if (name === 'Price') { /** User Clicked Cost Menu */
            return (
              <CostSubMenuWrapper key={name}>
                {subItems.map((item, index) => (
                  <SubItemPrice
                    key={item}
                    item={item}
                    value={index + 1}
                    searchParam={searchParam}
                    filterToggler={filterToggler}
                  />
                ))}
              </CostSubMenuWrapper>
            );
          } /** END OF IF STATEMENT */

          return (
            <div key={name}> {/** Default Menu */}
              {subItems.map((item) => {
                return (
                  <SubItem
                    key={item}
                    onClick={() => filterToggler('sort', item.toLowerCase())}
                    searchParam={searchParam}
                    item={item.toLowerCase()}
                  >
                    {item}
                  </SubItem>
                );
              })}
            </div>
          );
        }
      ) /** END OF MAP */
    }
  </SubCategory>
);

export default connect(state => ({ app: state.App }))(FilterSubCategory);
