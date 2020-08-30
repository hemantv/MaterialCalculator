import React from 'react';
import styled from 'styled-components/native';
import OperatorButton from './OperatorButton';

const OperatorGrid = () => {
  return (
    <Container>
      <Column>
        <OperatorButton icon={'backspace-outline'} />
        <OperatorButton icon={'division'} />
        <OperatorButton icon={'close'} />
        <OperatorButton icon={'minus'} />
        <OperatorButton icon={'plus'} />
      </Column>
    </Container>
  );
};

const Container = styled.View``;

const Column = styled.View``;

export default OperatorGrid;
