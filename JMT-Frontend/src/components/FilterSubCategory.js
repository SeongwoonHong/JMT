import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SubItemCusines from './SubItemCusines';
import SubItemCost from './SubItemCost';

const SubCategory = styled.div`
  flex: 1;
  padding: 5% 2%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CusinesSubMenuWrapper = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  max-height: 310px; /* This line should be fixed */
`;

const SubItem = styled.div`
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.7rem;
  padding: 3.5% 0px;

  color: ${props => props.searchParam.indexOf(props.item) > -1 || props.filtered.indexOf(props.item) > -1 ? 'red' : ''};
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
          if (name === 'Cusines') { /** User Clicked Cusines Manu */
            return (
              <CusinesSubMenuWrapper key={name} name={name}>
                {subItems.map(item => (
                  <SubItemCusines
                    displaying={name === 'Cusines'}
                    key={item}
                    item={item}
                    searchParam={searchParam}
                    filterToggler={filterToggler}
                    app={app}
                  />
                  ))
                }
              </CusinesSubMenuWrapper>
            );
          } else if (name === 'Cost') { /** User Clicked Cost Menu */
            return (
              <CostSubMenuWrapper key={name}>
                {subItems.map(item => (
                  <SubItemCost
                    key={item}
                    item={item}
                    searchParam={searchParam}
                    filterToggler={filterToggler}
                    filtered={app && app.filter}
                  />
                ))}
              </CostSubMenuWrapper>
            );
          } /** END OF IF STATEMENT */

          return (
            <div key={name}> {/** Default Menu */}
              {subItems.map(item => (
                <SubItem
                  key={item}
                  onClick={() => filterToggler(item)}
                  searchParam={searchParam}
                  item={item}
                  filtered={app && app.filter}
                >
                  {item}
                </SubItem>
              ))}
            </div>
          );
        }
      ) /** END OF MAP */
    }
  </SubCategory>
);

export default connect(state => ({ app: state.App }))(FilterSubCategory);
