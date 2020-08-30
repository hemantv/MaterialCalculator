import React from 'react';
import styled from 'styled-components/native';
import AdvancedOperatorButton from './AdvancedOperatorButton';

const AdvancedOperatorGrid = () => {
  return (
    <Container>
      <Row>
        <AdvancedOperatorButton label={'INV'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'DEG'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'%'}></AdvancedOperatorButton>
      </Row>
      <Row>
        <AdvancedOperatorButton label={'sin'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'cos'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'tan'}></AdvancedOperatorButton>
      </Row>
      <Row>
        <AdvancedOperatorButton label={'ln'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'log'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'√'}></AdvancedOperatorButton>
      </Row>
      <Row>
        <AdvancedOperatorButton label={'π'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'e'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'^'}></AdvancedOperatorButton>
      </Row>
      <Row>
        <AdvancedOperatorButton label={'('}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={')'}></AdvancedOperatorButton>
        <AdvancedOperatorButton label={'!'}></AdvancedOperatorButton>
      </Row>
    </Container>
  );
};

const Container = styled.View``;

const Row = styled.View`
  flex-direction: row;
`;

export default AdvancedOperatorGrid;
