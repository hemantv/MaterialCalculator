import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable, Animated} from 'react-native';
import theme from 'styled-theming';

const buttonColor = theme('mode', {
  light: '#3374e0',
  dark: '#92b4f3',
});

const OperatorButton = ({label, value, onPress, onLongPress, icon}) => {
  const rippleAnimation = React.useRef(new Animated.Value(0)).current;

  const animateRipple = () => {
    Animated.timing(rippleAnimation, {
      toValue: 6,
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
        onPress={onPress}
        onLongPress={onLongPress}>
        {label ? (
          <Label style={{fontVariant: ['tabular-nums']}}>{label}</Label>
        ) : (
          <IconLabel name={icon} />
        )}
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

const Label = styled.Text`
  font-size: 32px;
  font-weight: 500;
  color: ${buttonColor};
`;

const IconLabel = styled(Icon)`
  font-size: 24px;
  color: ${buttonColor};
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

export default OperatorButton;
