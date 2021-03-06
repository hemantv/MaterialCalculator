import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PanResponder, Animated, View, Pressable} from 'react-native';
import AdvancedOperatorGrid from './AdvancedOperatorGrid';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import theme from 'styled-theming';

const backgroundColor = theme('mode', {
  light: '#3374e0',
  dark: '#244fa0',
});

const SidePanel = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  const width = React.useRef(0);
  const [expanded, setExpanded] = React.useState(false);

  const expandedRef = React.useRef(expanded);
  const setExpandedRef = (data) => {
    expandedRef.current = data;
    setExpanded(data);
  };

  const overlayBackground = translateX.interpolate({
    inputRange: [-width.current, 0],
    outputRange: [0.5, 0],
  });

  const chevronAnim = React.useRef(new Animated.Value(0)).current;

  const rotate = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (-width.current < gestureState.dx) {
          translateX.setValue(gestureState.dx);
          if (!expandedRef.current) {
            setExpandedRef(true);
            Animated.timing(chevronAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > -50 || gestureState.dx > 50) {
          translateX.flattenOffset();
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            if (expandedRef.current) {
              setExpandedRef(false);
              Animated.timing(chevronAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }
          });
        } else {
          Animated.timing(translateX, {
            toValue: -width.current,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            translateX.extractOffset();
          });
        }
      },
    }),
  ).current;

  const toggleSlider = () => {
    if (expandedRef.current) {
      translateX.flattenOffset();
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (expandedRef.current) {
          setExpandedRef(false);
          Animated.timing(chevronAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      });
    } else {
      setExpandedRef(true);
      Animated.timing(translateX, {
        toValue: -width.current,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        translateX.extractOffset();
      });
      Animated.timing(chevronAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      {expandedRef.current && (
        <AnimatedOverlay
          style={{
            opacity: overlayBackground,
          }}
        />
      )}
      <AnimatedContainer
        {...panResponder.panHandlers}
        style={{
          transform: [{translateX}],
        }}>
        <Slider onPress={toggleSlider}>
          <AnimatedSlideIcon
            name={'chevron-left'}
            style={{
              transform: [{rotate}],
            }}
          />
        </Slider>
        <GridContainer
          style={{
            paddingTop: getStatusBarHeight() / 2,
            paddingBottom: getStatusBarHeight() / 2,
          }}
          onLayout={(event) => {
            width.current = event.nativeEvent.layout.width - 10;
          }}>
          <AdvancedOperatorGrid />
        </GridContainer>
      </AnimatedContainer>
    </>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${backgroundColor};
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Slider = styled(Pressable)`
  height: 100%;
  justify-content: center;
`;

const SlideIcon = styled(Icon)`
  color: #ffffff;
  font-size: 32px;
`;

const AnimatedSlideIcon = Animated.createAnimatedComponent(SlideIcon);

const GridContainer = styled.View``;

const Overlay = styled.View`
  position: absolute;
  background-color: #000000;
  width: 100%;
  height: 100%;
`;

const AnimatedOverlay = Animated.createAnimatedComponent(Overlay);

export default SidePanel;
