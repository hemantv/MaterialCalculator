import React from 'react';
import styled from 'styled-components/native';
import NumericButton from './NumericButton';

const NumericGrid = () => {
  return (
    <Container>
      <Row>
        <NumericButton label={'7'}></NumericButton>
        <NumericButton label={'8'}></NumericButton>
        <NumericButton label={'9'}></NumericButton>
      </Row>
      <Row>
        <NumericButton label={'4'}></NumericButton>
        <NumericButton label={'5'}></NumericButton>
        <NumericButton label={'6'}></NumericButton>
      </Row>
      <Row>
        <NumericButton label={'1'}></NumericButton>
        <NumericButton label={'2'}></NumericButton>
        <NumericButton label={'3'}></NumericButton>
      </Row>
      <Row>
        <NumericButton label={'0'}></NumericButton>
        <NumericButton label={'.'}></NumericButton>
        <NumericButton label={'='}></NumericButton>
      </Row>
    </Container>
  );
};

const Container = styled.View``;

const Row = styled.View`
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
`;

export default NumericGrid;
