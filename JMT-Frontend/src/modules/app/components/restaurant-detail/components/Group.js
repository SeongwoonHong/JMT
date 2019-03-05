import React from 'react';
import styled from 'styled-components';

const Group = ({
  date,
  count,
}) => {
  return (
    <StyledGroup>
      <StyledDate>{date}</StyledDate>
      <StyledCount>{count}</StyledCount>
    </StyledGroup>
  );
};

export default Group;

const StyledGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;
const StyledDate = styled.div`
  width: 50%;
`;

const StyledCount = styled.div`
  width: 50%;
  text-align: right;
`;
