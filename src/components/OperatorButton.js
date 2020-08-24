import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OperatorButton = ({icon}) => {
  return (
    <Container>
      <Button onPress={() => {}}>
        <IconLabel name={icon} />
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Button = styled.TouchableHighlight`
  padding: 24px 48px;
  align-items: center;
`;

const IconLabel = styled(Icon)`
  font-size: 28px;
  color: #3374e1;
`;

export default OperatorButton;
