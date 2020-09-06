/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import ButtonPanel from './src/components/ButtonPanel';
import OutputPanel from './src/components/OutputPanel';
import MenuPanel from './src/components/MenuPanel';
import {Provider, useSelector, useDispatch} from 'react-redux';
import store from './src/redux/store';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {CHANGE_THEME} from './src/redux/actions';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer></AppContainer>
    </Provider>
  );
};

const AppContainer = () => {
  const {getItem, setItem} = useAsyncStorage('@theme');

  const {mode} = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const getSelectedTheme = async () => {
    let theme = await getItem();
    if (theme == null) {
      theme = 'light';
    }
    dispatch({type: CHANGE_THEME, payload: theme});
  };

  useEffect(() => {
    getSelectedTheme();
  }, []);

  return (
    <ThemeProvider theme={{mode}}>
      <Container>
        <MenuPanel />
        <OutputPanel />
        <ButtonPanel />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default App;
