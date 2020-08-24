import React from 'react';
import styled from 'styled-components/native';

const OutputPanel = () => {
  return (
    <Container>
      <InputText>12+25</InputText>
      <OutputText>27</OutputText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const InputText = styled.Text`
  flex: 1;
  align-self: flex-end;
  padding: 16px;
  font-size: 80px;
  font-weight: 500;
  letter-spacing: 6px;
`;

const OutputText = styled.Text`
  flex: 1;
  align-self: flex-end;
  padding: 16px;
  font-size: 40px;
  letter-spacing: 4px;
  color: #82878b;
`;

export default OutputPanel;
