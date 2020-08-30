import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PanResponder, Animated, View} from 'react-native';
import NumericGrid from './NumericGrid';

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

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (-width.current < gestureState.dx) {
          translateX.setValue(gestureState.dx);
          if (!expandedRef.current) setExpandedRef(true);
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
            if (expandedRef.current) setExpandedRef(false);
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
        <Slider>
          <SlideIcon name={'chevron-left'} />
        </Slider>
        <GridContainer
          onLayout={(event) => {
            width.current = event.nativeEvent.layout.width - 10;
          }}>
          <NumericGrid />
        </GridContainer>
      </AnimatedContainer>
    </>
  );
};

const Container = styled.View`
  background-color: #000000;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #3374e1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Slider = styled.View``;

const SlideIcon = styled(Icon)`
  color: #ffffff;
  font-size: 32px;
`;

const GridContainer = styled.View``;

const Overlay = styled.View`
  position: absolute;
  background-color: #000000;
  width: 100%;
  height: 100%;
`;

const AnimatedOverlay = Animated.createAnimatedComponent(Overlay);

export default SidePanel;
