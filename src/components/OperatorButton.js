import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable} from 'react-native';

const OperatorButton = ({icon}) => {
  const [active, setActive] = React.useState(false);

  return (
    <Container>
      {active && <Overlay />}
      <Button
        onPressIn={() => {
          setActive(true);
        }}
        onPressOut={() => {
          setActive(false);
        }}>
        <IconLabel name={icon} />
      </Button>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
`;

const Button = styled(Pressable)`
  padding: 24px 48px;
`;

const IconLabel = styled(Icon)`
  font-size: 24px;
  color: #3374e1;
`;

const Overlay = styled.View`
  position: absolute;
  align-self: center;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #dddddd;
  opacity: 0.6;
`;

export default OperatorButton;
