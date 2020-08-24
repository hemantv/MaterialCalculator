import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuPanel = () => {
  return (
    <Container>
      <Label>RAD</Label>
      <MenuIcon name={'dots-vertical'}></MenuIcon>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #82878b;
`;

const MenuIcon = styled(Icon)`
  font-size: 22px;
`;

export default MenuPanel;
