import React from 'react';
import styled from 'styled-components/native';
import {Pressable, Animated} from 'react-native';
import theme from 'styled-theming';

const foregroundColor = theme('mode', {
  light: '#ffffff',
  dark: '#e8eaed',
});

const selectedBackgroundColor = theme('mode', {
  light: 'rgba(255, 255, 255, 0.2)',
  dark: 'rgba(0, 0, 0, 0.2)',
});

const AdvancedOperatorButton = ({label, onPress, selected, superLabel}) => {
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
        selected={selected}
        onPressIn={() => {
          animateRipple();
        }}
        onPress={onPress}>
        <LabelContainer>
          <Label style={{fontVariant: ['tabular-nums']}}>{label}</Label>
          {superLabel && <SuperLabel>{superLabel}</SuperLabel>}
        </LabelContainer>
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
  background-color: ${(props) =>
    props.selected ? selectedBackgroundColor : 'transparent'};
`;

const LabelContainer = styled.View`
  flex-direction: row;
`;

const Label = styled.Text`
  font-size: 28px;
  font-weight: 500;
  color: ${foregroundColor};
`;

const SuperLabel = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${foregroundColor};
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
