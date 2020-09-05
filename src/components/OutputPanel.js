import React from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {Dimensions, Animated} from 'react-native';
import {RESET_CLEAR} from '../redux/actions';

const {width} = Dimensions.get('window');

const OutputPanel = () => {
  const [inputWidth, setInputWidth] = React.useState(0);
  const [fontScale, setFontScale] = React.useState(1);

  const expression = useSelector((state) => state.inputs);
  const output = useSelector((state) => state.output);
  const cleared = useSelector((state) => state.clear);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const rippleAnimation = React.useRef(new Animated.Value(0)).current;
  const fadeAnimation = React.useRef(new Animated.Value(1)).current;

  const animateRipple = () => {
    Animated.timing(rippleAnimation, {
      toValue: 20,
      timing: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        timing: 10,
        useNativeDriver: true,
      }).start(() => {
        rippleAnimation.setValue(0);
        fadeAnimation.setValue(1);
        dispatch({type: RESET_CLEAR});
      });
    });
  };

  const errorRippleAnimation = React.useRef(new Animated.Value(0)).current;
  const errorFadeAnimation = React.useRef(new Animated.Value(1)).current;

  const animateErrorRipple = () => {
    Animated.timing(errorRippleAnimation, {
      toValue: 20,
      timing: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(errorFadeAnimation, {
        toValue: 0,
        timing: 10,
        useNativeDriver: true,
      }).start(() => {
        errorRippleAnimation.setValue(0);
        errorFadeAnimation.setValue(1);
      });
    });
  };

  React.useEffect(() => {
    if (cleared) animateRipple();
  }, [cleared]);

  React.useEffect(() => {
    if (error) animateErrorRipple();
  }, [error]);

  return (
    <Container>
      <AnimatedClearRipple
        style={{
          transform: [{scale: rippleAnimation}],
          opacity: fadeAnimation,
        }}
      />
      <AnimatedErrorRipple
        style={{
          transform: [{scale: errorRippleAnimation}],
          opacity: errorFadeAnimation,
        }}
      />
      <InputText
        value={expression.map((item) => item.label).join('')}
        style={{
          width: inputWidth,
          fontSize: 80 * fontScale,
        }}
        onContentSizeChange={(e) => {
          const contentWidth = e.nativeEvent.contentSize.width;
          if (contentWidth > width && fontScale > 0.7) {
            setFontScale(fontScale - 0.1);
          } else {
            setInputWidth(contentWidth);
          }
        }}
        autoFocus={true}
      />
      <OutputText
        style={{color: error ? '#c62828' : '#82878b'}}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        {output}
      </OutputText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  padding: 16px;
`;

const InputText = styled.TextInput`
  align-self: flex-end;
  font-size: 80px;
  font-weight: 500;
`;

const OutputText = styled.Text`
  align-self: flex-end;
  font-size: 40px;
  letter-spacing: 4px;
`;

const ClearRipple = styled.View`
  position: absolute;
  background-color: rgba(51, 116, 225, 0.4);
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const AnimatedClearRipple = Animated.createAnimatedComponent(ClearRipple);

const ErrorRipple = styled.View`
  position: absolute;
  background-color: rgba(198, 40, 40, 0.4);
  bottom: 0;
  align-self: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const AnimatedErrorRipple = Animated.createAnimatedComponent(ErrorRipple);

export default OutputPanel;
