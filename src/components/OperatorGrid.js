import React from 'react';
import styled from 'styled-components/native';
import OperatorButton from './OperatorButton';
import {useDispatch} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  INPUT_OPERATOR,
  CLEAR_LAST_INPUT,
  CLEAR_EXPRESSION,
} from '../redux/actions';

const operatorData = [
  {
    icon: 'backspace-outline',
    type: CLEAR_LAST_INPUT,
    secondaryType: CLEAR_EXPRESSION,
  },
  {label: '÷', value: '/', type: INPUT_OPERATOR},
  {label: '×', value: '*', type: INPUT_OPERATOR},
  {label: '−', value: '-', type: INPUT_OPERATOR},
  {label: '+', value: '+', type: INPUT_OPERATOR},
];

const OperatorGrid = () => {
  const dispatch = useDispatch();

  return (
    <Container style={{paddingBottom: getStatusBarHeight() / 2}}>
      <Column>
        {operatorData.map((operator) => (
          <OperatorButton
            {...operator}
            onPress={() => {
              dispatch({
                type: operator.type,
                payload: operator,
              });
            }}
            onLongPress={() => {
              operator.secondaryType &&
                dispatch({
                  type: operator.secondaryType,
                  payload: operator,
                });
            }}
          />
        ))}
      </Column>
    </Container>
  );
};

const Container = styled.View`
  background-color: #f2f3f5;
`;

const Column = styled.View``;

export default OperatorGrid;
