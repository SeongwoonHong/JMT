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

  color: ${props => props.searchParam.indexOf(props.item) > -1 || props.filtered.indexOf(props.item) > -1 ? 'red' : ''};
  border: ${props => props.searchParam.indexOf(props.item) > -1 || props.filtered.indexOf(props.item) > -1 ? '1px red solid' : '1px lightGray solid'};
  transition: all .2s;
`;


const SubItemCost = ({
  item, filterToggler, searchParam, filtered
}) => <CostWrapper onClick={() => filterToggler(item)} searchParam={searchParam} filtered={filtered} item={item}>{item}</CostWrapper>;

export default SubItemCost;
