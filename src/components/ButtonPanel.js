import React from 'react';
import styled from 'styled-components';
import NumericGrid from './NumericGrid';
import OperatorGrid from './OperatorGrid';
import SidePanel from './SidePanel';

const ButtonPanel = () => {
  return (
    <Container>
      <NumericGrid />
      <Separator />
      <OperatorGrid />
      <SidePanel />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  background-color: #f2f3f5;
`;

const Separator = styled.View`
  width: 1px;
  background-color: #dddddd;
`;

export default ButtonPanel;
