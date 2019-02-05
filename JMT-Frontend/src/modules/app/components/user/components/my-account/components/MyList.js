import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Loader } from 'components';
import { Group } from 'actions';
import { convertDateObject } from 'utils/date-utils';
import { colors } from 'constants';

@connect(state => ({
  group: state.Group,
}))
class MyList extends Component {
  componentWillMount = () => {
    const { dispatch } = this.props;
    const { groups } = this.props.group;

    if (!groups.length) {
      return dispatch(Group.getGroupsByUser());
    }

    return false;
  }

  renderLoader = () => {
    const { isLoading } = this.props.group;

    if (isLoading) {
      return <Loader isSmall />;
    }

    return false;
  }

  renderGroups = () => {
    const { groups } = this.props.group;

    return (
      <StyledGroups>
        {groups.map((group) => {
          return (
            <StyledGroup key={group.id}>
              {/* <div>Category: {group.categoryId}</div> */}
              <StyledGroupName><strong>Restaurant</strong>: {group.restaurantName}</StyledGroupName>
              <StyledGroupDate><strong>date</strong>: {convertDateObject(new Date(group.date), false)}</StyledGroupDate>
            </StyledGroup>
          );
        })}
      </StyledGroups>
    );
  }

  render() {
    return (
      <StyledMyList>
        {this.renderLoader()}
        {this.renderGroups()}
      </StyledMyList>
    );
  }
}

export default MyList;

const StyledMyList = styled.div`
`;

const StyledGroups = styled.div`
`;

const StyledGroup = styled.div`
  background-color: ${colors.white};
  padding: 10px;
  border-radius: 10px;
  color: ${colors.black};
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
  width: calc(100% - 20px);

  &:hover {
    opacity: 0.8;
  }
`;

const StyledGroupName = styled.div`
  margin: 5px 0px;
`;

const StyledGroupDate = styled.div`
  margin: 5px 0px;
`;

