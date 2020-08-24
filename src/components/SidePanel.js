import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SidePanel = () => {
  return (
    <Container>
      <Slider>
        <SlideIcon name={'chevron-left'} />
      </Slider>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #3374e1;
`;

const Slider = styled.View``;

const SlideIcon = styled(Icon)`
  color: #ffffff;
  font-size: 32px;
`;

export default SidePanel;
