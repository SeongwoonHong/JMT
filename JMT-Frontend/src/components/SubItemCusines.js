import React from 'react';
import styled from 'styled-components';

const SubItem = styled.label`
  flex: 1 0 auto;
  font-size: 1.2rem;
  line-height: 2rem;

  color: ${props => props.searchParam.indexOf(props.item) > -1 || props.filtered.indexOf(props.item) > -1 ? 'red' : ''};
  transition: all .2s;
`;
const CheckBox = styled.input`
  -ms-transform: scale(1); /* IE */
  -moz-transform: scale(1); /* FF */
  -webkit-transform: scale(1); /* Safari and Chrome */
  -o-transform: scale(1); /* Opera */
`;

const SubItemCusines = ({
  item, filterToggler, searchParam, app
}) => (
  <SubItem
    key={item}
    searchParam={searchParam}
    item={item}
    filtered={app && app.filter}
  >
    <CheckBox
      style={{ margin: '0px 10px 15px 0px' }}
      type="checkbox"
      onChange={() => filterToggler(item)}
      checked={searchParam.indexOf(item) > -1}
      value={item}
    />
    {item}
    <br />
  </SubItem>
);

export default SubItemCusines;
