import React from 'react';
import styled from 'styled-components/native';

const NumericButton = ({label}) => {
  return (
    <Container>
      <Button onPress={() => {}}>
        <Label>{label}</Label>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex-grow: 1;
`;

const Button = styled.TouchableHighlight`
  padding: 32px;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 32px;
  font-weight: 500;
`;

export default NumericButton;
