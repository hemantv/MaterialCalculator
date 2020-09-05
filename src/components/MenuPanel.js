import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector, useDispatch} from 'react-redux';
import {TOGGLE_MODE} from '../redux/actions';

const MenuPanel = () => {
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  return (
    <Container style={{paddingTop: getStatusBarHeight()}}>
      <ModeButton
        onPress={() => {
          dispatch({type: TOGGLE_MODE});
        }}>
        <ModeLabel>{mode}</ModeLabel>
      </ModeButton>
      <MenuButton>
        <MenuIcon name={'dots-vertical'}></MenuIcon>
      </MenuButton>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const ModeButton = styled.TouchableHighlight`
  padding: 4px;
`;

const ModeLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #82878b;
`;

const MenuButton = styled.TouchableHighlight`
  padding: 4px;
`;

const MenuIcon = styled(Icon)`
  font-size: 22px;
`;

export default MenuPanel;
