import React from 'react';
import styled from 'styled-components/native';
import AdvancedOperatorButton from './AdvancedOperatorButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  INPUT_ADVANCED_OPERATOR,
  TOGGLE_MODE,
  TOGGLE_INVERSE,
} from '../redux/actions';
import {MODE_RADIAN, MODE_DEGREE} from '../utils/Constants';

const advancedOperatorData = [
  [
    {
      label: 'sin',
      value: 'sin(',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: false,
    },
    {
      label: 'cos',
      value: 'cos(',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: false,
    },
    {
      label: 'tan',
      value: 'tan(',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: false,
    },
  ],
  [
    {label: 'ln', value: 'ln(', type: INPUT_ADVANCED_OPERATOR, inverse: false},
    {
      label: 'log',
      value: 'log(',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: false,
    },
    {label: '√', value: 'root(', type: INPUT_ADVANCED_OPERATOR, inverse: false},
  ],
  [
    {
      label: 'sin',
      value: 'asin',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: true,
      superLabel: '-1',
    },
    {
      label: 'cos',
      value: 'acos(',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: true,
      superLabel: '-1',
    },
    {
      label: 'tan',
      value: 'atan(',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: true,
      superLabel: '-1',
    },
  ],
  [
    {
      label: 'e',
      value: 'e^',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: true,
      superLabel: 'x',
    },
    {
      label: '10',
      value: '10^',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: true,
      superLabel: 'x',
    },
    {
      label: 'x',
      value: '^2',
      type: INPUT_ADVANCED_OPERATOR,
      inverse: true,
      superLabel: '2',
    },
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
  const inverse = useSelector((state) => state.inverse);
  const mode = useSelector((state) => state.mode);

  return (
    <Container>
      <Row>
        <AdvancedOperatorButton
          label={'INV'}
          selected={inverse}
          onPress={() => {
            dispatch({type: TOGGLE_INVERSE});
          }}
        />
        <AdvancedOperatorButton
          label={mode == MODE_RADIAN ? MODE_DEGREE : MODE_RADIAN}
          onPress={() => {
            dispatch({type: TOGGLE_MODE});
          }}
        />
        <AdvancedOperatorButton
          label={'%'}
          onPress={() => {
            dispatch({
              type: dataCol.type,
              payload: {
                label: '%',
                value: '/100',
                type: INPUT_ADVANCED_OPERATOR,
              },
            });
          }}
        />
      </Row>
      {advancedOperatorData.map((dataRow) => {
        return (
          <Row>
            {dataRow
              .filter((dataCol) =>
                dataCol.inverse != null ? dataCol.inverse == inverse : true,
              )
              .map((dataCol) => (
                <AdvancedOperatorButton
                  {...dataCol}
                  onPress={() => {
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

const Container = styled.View``;

const Row = styled.View`
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

export default AdvancedOperatorGrid;
