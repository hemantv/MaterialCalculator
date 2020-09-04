import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable, Animated} from 'react-native';

const OperatorButton = ({icon, value, onPress, onLongPress}) => {
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
        <IconLabel name={icon} />
      </Button>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
`;

const Button = styled(Pressable)`
  padding: 32px 48px;
`;

const IconLabel = styled(Icon)`
  font-size: 24px;
  color: #3374e1;
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
  background-color: rgba(221, 221, 221, 0.6);
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const AnimatedRipple = Animated.createAnimatedComponent(Ripple);

export default OperatorButton;
