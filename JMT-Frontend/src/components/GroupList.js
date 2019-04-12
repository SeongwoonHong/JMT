import React from 'react';
import styled from 'styled-components';
// import { colors } from 'constants';
import { convertDateObject } from 'utils/date-utils';
import { Button } from 'components';

const GroupList = ({ group }) => (
  <StyledGroup key={group.id}>
    <StyledVertical>
      <StyledGroupName>
        <strong>Restaurant</strong>: {group.restaurantName}
      </StyledGroupName>
      <StyledGroupDate>
        <strong>date</strong>: {convertDateObject(new Date(group.date), false)}
      </StyledGroupDate>
      <div>Count: {group.count}</div>
    </StyledVertical>
    <StyledButton className="right top">
      {' '}
      <Button className="btn" style={{ width: '70px', height: '70px' }}>
        Join
      </Button>
    </StyledButton>
  </StyledGroup>
);

export default GroupList;

const StyledGroup = styled.div`
  list-style: none;
  background-color: rgba(0, 0, 0, 0.05);
  background-image: linear-gradient(
    90deg,
    rgb(244, 123, 66) 10px,
    #eee 10px,
    #eee 11px,
    transparent 11px
  );
  padding: 10px 15px 10px 25px;
  border: 1px solid #ccc;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
`;

const StyledGroupName = styled.div`
  margin: 5px 0px;
`;

const StyledGroupDate = styled.div`
  margin: 5px 0px;
`;

const StyledButton = styled.div``;

const StyledVertical = styled.div`
  display: flex;
  flex-direction: column;
`;
