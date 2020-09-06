import React from 'react';
import styled from 'styled-components/native';
import NumericButton from './NumericButton';
import {useDispatch} from 'react-redux';
import {INPUT_NUMBER, EVALUATE_EXPRESSION} from '../redux/actions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import theme from 'styled-theming';

const numericGridData = [
  [
    {label: '7', value: 7, type: INPUT_NUMBER},
    {label: '8', value: 8, type: INPUT_NUMBER},
    {label: '9', value: 9, type: INPUT_NUMBER},
  ],
  [
    {label: '4', value: 4, type: INPUT_NUMBER},
    {label: '5', value: 5, type: INPUT_NUMBER},
    {label: '6', value: 6, type: INPUT_NUMBER},
  ],
  [
    {label: '1', value: 1, type: INPUT_NUMBER},
    {label: '2', value: 2, type: INPUT_NUMBER},
    {label: '3', value: 3, type: INPUT_NUMBER},
  ],
  [
    {label: '0', value: 0, type: INPUT_NUMBER},
    {label: '.', value: '.', type: INPUT_NUMBER},
    {label: '=', value: '=', type: EVALUATE_EXPRESSION},
  ],
];

const backgroundColor = theme('mode', {
  light: '#f1f3f4',
  dark: '#202124',
});

const NumericGrid = () => {
  const dispatch = useDispatch();

  return (
    <Container style={{paddingBottom: getStatusBarHeight() / 2}}>
      {numericGridData.map((dataRow) => {
        return (
          <Row>
            {dataRow.map((dataCol) => (
              <NumericButton
                {...dataCol}
                onPress={(e) => {
                  dispatch({
                    type: dataCol.type,
                    payload: dataCol,
                  });
                }}
              />
            ))}
          </Row>
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  background-color: ${backgroundColor};
`;

const Row = styled.View`
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
`;

export default NumericGrid;
