import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  padding: 3% 0px;
`;

const ModalCloser = styled.div`
  flex: 0.2;
  display: flex;
  font-size: 1.3rem;
  align-items: center;

  :hover {
    color: red;
    transition: all 0.5s;
  }
`;

const Title = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-itmes: center;
  padding-right: 15%;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ModalTitle = ({ modalClose, title }) => (
  <TitleWrapper>
    <ModalCloser onClick={modalClose}>X</ModalCloser>
    <Title>{title}</Title>
  </TitleWrapper>
);

export default ModalTitle;
