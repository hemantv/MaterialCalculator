import React from 'react';
import styled from 'styled-components/native';
import {Pressable, Animated} from 'react-native';
import theme from 'styled-theming';

const foregroundColor = theme('mode', {
  light: '#202124',
  dark: '#e8eaed',
});

const NumericButton = ({label, value, onPress, onLongPress}) => {
  const rippleAnimation = React.useRef(new Animated.Value(0)).current;

  const animateRipple = () => {
    Animated.timing(rippleAnimation, {
      toValue: 2,
      timing: 0,
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
  color: ${foregroundColor};
`;

const Ripple = styled.View`
  position: absolute;
  align-self: center;
  background-color: rgba(221, 221, 221, 0.6);
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const AnimatedRipple = Animated.createAnimatedComponent(Ripple);

export default NumericButton;
