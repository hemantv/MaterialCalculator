import React from 'react';
import styled from 'styled-components';
import NumericGrid from './NumericGrid';
import OperatorGrid from './OperatorGrid';
import SidePanel from './SidePanel';
import theme from 'styled-theming';

const separatorColor = theme('mode', {
  light: '#dadce0',
  dark: '#3e3e3e',
});

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
`;

const Separator = styled.View`
  width: 1px;
  background-color: ${separatorColor};
`;

export default ButtonPanel;
