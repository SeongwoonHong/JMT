import React, { Component } from 'react';
import styled from 'styled-components';
import { SelectionIndicators, Button, Logo } from 'components';

class Home extends Component {
  render() {
    return (
      <div>
        <Logo
          width="150px"
          height="150px"
        />
        <SelectionIndicators
          progressSections={[
            {
              id: 0,
              content: '11111111'
            },
            {
              id: 1,
              content: '222222'
            },
            {
              id: 2,
              content: '33333333'
            }
          ]}
          selectedIndex={1}
        />
        {/* <Button>Skip</Button> */}
      </div>
    );
  }
}

export default Home;

const StyledLogo = styled.div`
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 70px;
`;
