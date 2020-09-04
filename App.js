/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components';
import ButtonPanel from './src/components/ButtonPanel';
import OutputPanel from './src/components/OutputPanel';
import MenuPanel from './src/components/MenuPanel';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {Dimensions, StatusBar} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <MenuPanel />
        <OutputPanel />
        <ButtonPanel />
      </Container>
    </Provider>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default App;
