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

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Container>
          <MenuPanel />
          <OutputPanel />
          <ButtonPanel />
        </Container>
      </SafeAreaView>
    </>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default App;
