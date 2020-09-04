import React from 'react';
import styled from 'styled-components/native';
import {Pressable, Animated} from 'react-native';

const AdvancedOperatorButton = ({label, onPress}) => {
  const rippleAnimation = React.useRef(new Animated.Value(0)).current;

  const animateRipple = () => {
    Animated.timing(rippleAnimation, {
      toValue: 5,
      timing: 100,
      useNativeDriver: true,
    }).start(() => {
      rippleAnimation.setValue(0);
    });
  };

  return (
    <Container>
      <AnimatedRipple
        style={{
          transform: [{scale: rippleAnimation}],
        }}
      />
      <Button
        onPressIn={() => {
          animateRipple();
        }}
        onPress={onPress}>
        <Label style={{fontVariant: ['tabular-nums']}}>{label}</Label>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex-grow: 1;
`;

const Button = styled(Pressable)`
  padding: 24px 32px;
  align-items: center;
  border-radius: 50px;
`;

const Label = styled.Text`
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
`;

const Overlay = styled.View`
  position: absolute;
  align-self: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #dddddd;
  opacity: 0.6;
`;

const Ripple = styled.View`
  position: absolute;
  align-self: center;
  background-color: rgba(255, 255, 255, 0.2);
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const AnimatedRipple = Animated.createAnimatedComponent(Ripple);

export default AdvancedOperatorButton;
