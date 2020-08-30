import React from 'react';
import styled from 'styled-components/native';
import {Pressable} from 'react-native';

const NumericButton = ({label}) => {
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
        <Label style={{fontVariant: ['tabular-nums']}}>{label}</Label>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex-grow: 1;
  align-self: center;
  justify-content: center;
`;

const Button = styled(Pressable)`
  padding: 24px 32px;
  align-items: center;
  border-radius: 50px;
`;

const Label = styled.Text`
  font-size: 32px;
  font-weight: 500;
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

export default NumericButton;
