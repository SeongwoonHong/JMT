import React from 'react';
import styled from 'styled-components';
import { capitalizeFirstLetter } from 'utils/string-format';

const SubItem = styled.label`
  flex: 1 0 auto;
  font-size: 1.2rem;
  line-height: 2rem;
  color: ${props => props.searchParam.cuisines && props.searchParam.cuisines.indexOf(props.item) > -1 ? 'red' : ''};
  transition: all .2s;
`;

const CheckBox = styled.input`
  -ms-transform: scale(1); /* IE */
  -moz-transform: scale(1); /* FF */
  -webkit-transform: scale(1); /* Safari and Chrome */
  -o-transform: scale(1); /* Opera */
  width: initial;
`;

const SubItemCuisines = ({
  item, filterToggler, searchParam,
}) => (
  <SubItem
    key={item}
    searchParam={searchParam}
    item={item}
  >
    <CheckBox
      style={{ margin: '0px 10px 15px 0px' }}
      type="checkbox"
      onChange={() => filterToggler('cuisines', item)}
      checked={searchParam.cuisines && searchParam.cuisines.indexOf(item) > -1}
      value={item}
    />
    {capitalizeFirstLetter(item)}
    <br />
  </SubItem>
);

export default SubItemCuisines;
