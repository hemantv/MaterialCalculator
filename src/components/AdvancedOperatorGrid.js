import React from 'react';
import styled from 'styled-components/native';
import AdvancedOperatorButton from './AdvancedOperatorButton';
import {useDispatch} from 'react-redux';
import {INPUT_ADVANCED_OPERATOR} from '../redux/actions';

const advancedOperatorData = [
  [
    {label: 'INV'},
    {label: 'DEG'},
    {label: '%', value: '/100', type: INPUT_ADVANCED_OPERATOR},
  ],
  [
    {label: 'sin', value: 'sin(', type: INPUT_ADVANCED_OPERATOR},
    {label: 'cos', value: 'cos(', type: INPUT_ADVANCED_OPERATOR},
    {label: 'tan', value: 'tan(', type: INPUT_ADVANCED_OPERATOR},
  ],
  [
    {label: 'ln', value: 'ln(', type: INPUT_ADVANCED_OPERATOR},
    {label: 'log', value: 'log(', type: INPUT_ADVANCED_OPERATOR},
    {label: '√', value: 'root(', type: INPUT_ADVANCED_OPERATOR},
  ],
  [
    {label: 'π', value: 'pi', type: INPUT_ADVANCED_OPERATOR},
    {label: 'e', value: 'e', type: INPUT_ADVANCED_OPERATOR},
    {label: '^', value: '^', type: INPUT_ADVANCED_OPERATOR},
  ],
  [
    {label: '(', value: '(', type: INPUT_ADVANCED_OPERATOR},
    {label: ')', value: ')', type: INPUT_ADVANCED_OPERATOR},
    {label: '!', value: '!', type: INPUT_ADVANCED_OPERATOR},
  ],
];

const AdvancedOperatorGrid = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      {advancedOperatorData.map((dataRow) => {
        return (
          <Row>
            {dataRow.map((dataCol) => (
              <AdvancedOperatorButton
                {...dataCol}
                onPress={() => {
                  dispatch({
                    type: dataCol.type,
                    payload: {label: dataCol.label, value: dataCol.value},
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

const Container = styled.View``;

const Row = styled.View`
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

export default AdvancedOperatorGrid;
