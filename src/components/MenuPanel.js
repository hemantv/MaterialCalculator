import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector, useDispatch} from 'react-redux';
import {TOGGLE_MODE, CHANGE_THEME} from '../redux/actions';
import theme from 'styled-theming';
import Menu, {MenuItem} from 'react-native-material-menu';
import {SinglePickerMaterialDialog} from 'react-native-material-dialog';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {Appearance} from 'react-native';

const backgroundColor = theme('mode', {
  light: '#ffffff',
  dark: '#2e3033',
});

const foregroundColor = theme('mode', {
  light: '#606368',
  dark: '#9ba0a5',
});

const THEME_OPTIONS = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
];

const MenuPanel = () => {
  const {setItem} = useAsyncStorage('@theme');

  const {mode} = useSelector((state) => state.calculator);
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  let _menu = null;
  const setMenuRef = (ref) => {
    _menu = ref;
  };

  const getSelectedTheme = () => {
    return THEME_OPTIONS.find((option) => option.value == themeMode);
  };

  const [selectedTheme, setSelectedTheme] = React.useState(getSelectedTheme());
  const [themeDialogVisible, setThemeDialogVisible] = React.useState(false);

  useEffect(() => {
    setSelectedTheme(getSelectedTheme(themeMode));
  }, [themeMode]);

  const menuBackgroundColor = {
    light: '#ffffff',
    dark: '#202124',
  };

  const menuForegroundColor = {
    light: '#000000',
    dark: '#fafafa',
  };

  const menuStyle = {
    backgroundColor: menuBackgroundColor[themeMode],
  };

  const menuItemStyle = {
    color: menuForegroundColor[themeMode],
  };

  const accentColor = themeMode == 'light' ? '#3374e0' : '#92b4f3';

  return (
    <Container style={{paddingTop: getStatusBarHeight()}}>
      <ModeButton
        onPress={() => {
          dispatch({type: TOGGLE_MODE});
        }}>
        <ModeLabel>{mode}</ModeLabel>
      </ModeButton>
      <Menu
        style={menuStyle}
        ref={setMenuRef}
        button={
          <MenuButton
            onPress={() => {
              _menu.show();
            }}>
            <MenuIcon name={'dots-vertical'}></MenuIcon>
          </MenuButton>
        }>
        <MenuItem
          textStyle={menuItemStyle}
          onPress={() => {
            _menu.hide(() => {
              setThemeDialogVisible(true);
            });
          }}>
          Choose theme
        </MenuItem>
      </Menu>
      {themeDialogVisible && (
        <SinglePickerMaterialDialog
          title={'Choose theme'}
          items={THEME_OPTIONS.map((row, index) => ({
            value: row.value,
            label: row.label,
          }))}
          visible={themeDialogVisible}
          selectedItem={selectedTheme}
          colorAccent={accentColor}
          backgroundColor={menuBackgroundColor[themeMode]}
          titleColor={menuForegroundColor[themeMode]}
          itemTextColor={menuForegroundColor[themeMode]}
          onCancel={() => setThemeDialogVisible(false)}
          onOk={(result) => {
            let theme = result.selectedItem.value;
            if (theme == 'system') {
              theme = Appearance.getColorScheme();
            }
            setThemeDialogVisible(false);
            dispatch({type: CHANGE_THEME, payload: theme});
            setSelectedTheme(result.selectedItem);
            setItem(result.selectedItem.value);
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${backgroundColor};
`;

const ModeButton = styled.TouchableHighlight`
  padding: 4px;
`;

const ModeLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${foregroundColor};
`;

const MenuButton = styled.TouchableHighlight`
  padding: 4px;
`;

const MenuIcon = styled(Icon)`
  font-size: 22px;
  color: ${foregroundColor};
`;

export default MenuPanel;
