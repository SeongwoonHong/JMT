import React from 'react';
import styled from 'styled-components';

const CostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13%;
  height: 13%;
  padding: 8% 3%;
  border-radius: 100%;
  color: ${props => props.searchParam.price && props.searchParam.price.indexOf(props.value) > -1 ? 'red' : ''};
  border: ${props => props.searchParam.price && props.searchParam.price.indexOf(props.value) > -1 ? '1px red solid' : '1px lightGray solid'};
  transition: all .2s;
`;

const SubItemPrice = ({
  item, filterToggler, searchParam, value
}) => (
  <CostWrapper
    onClick={() => filterToggler('price', value)}
    searchParam={searchParam}
    item={item}
    value={value}
  >
    {item}
  </CostWrapper>
);

export default SubItemPrice;
