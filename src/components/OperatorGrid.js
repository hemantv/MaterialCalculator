import React from 'react';
import styled from 'styled-components/native';
import OperatorButton from './OperatorButton';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  INPUT_OPERATOR,
  CLEAR_LAST_INPUT,
  CLEAR_EXPRESSION,
} from '../redux/actions';

const operatorData = [
  {label: '÷', value: '/', type: INPUT_OPERATOR},
  {label: '×', value: '*', type: INPUT_OPERATOR},
  {label: '−', value: '-', type: INPUT_OPERATOR},
  {label: '+', value: '+', type: INPUT_OPERATOR},
];

const OperatorGrid = () => {
  const dispatch = useDispatch();
  const evaluated = useSelector((state) => state.evaluated);

  return (
    <Container style={{paddingBottom: getStatusBarHeight() / 2}}>
      <Column>
        {evaluated ? (
          <OperatorButton
            label={'C'}
            onPress={() => {
              dispatch({
                type: CLEAR_EXPRESSION,
              });
            }}
          />
        ) : (
          <OperatorButton
            icon={'backspace-outline'}
            onPress={() => {
              dispatch({
                type: CLEAR_LAST_INPUT,
              });
            }}
            onLongPress={() => {
              dispatch({
                type: CLEAR_EXPRESSION,
              });
            }}
          />
        )}
        {operatorData.map((operator) => (
          <OperatorButton
            {...operator}
            onPress={() => {
              dispatch({
                type: operator.type,
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
