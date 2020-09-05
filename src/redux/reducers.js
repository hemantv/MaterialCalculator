const {
  INPUT_NUMBER,
  INPUT_OPERATOR,
  CLEAR_LAST_INPUT: CLEAR_LAST_CHARACTER,
  CLEAR_EXPRESSION,
  EVALUATE_EXPRESSION,
  RESET_CLEAR,
  RESET_ERROR,
  INPUT_ADVANCED_OPERATOR,
  TOGGLE_MODE,
  TOGGLE_INVERSE,
} = require('./actions');
import mexp from 'math-expression-evaluator';
import {MODE_DEGREE, MODE_RADIAN} from '../utils/Constants';

const initialState = {
  mode: MODE_RADIAN,
  inverse: false,
  inputs: [],
  output: '',
  clear: false,
  evaluated: false,
  error: false,
};

const evaluateExpression = (expression) => {
  let output;
  try {
    console.log(expression);
    output = mexp.eval(expression);
  } catch (e) {
    console.log(e);
  }
  return output;
};

const getExpression = (inputs, mode) => {
  return inputs.map((item) => item.value).join('');
};

const calculatorReducer = (state = initialState, action) => {
  let mode = state.mode;
  let inverse = state.inverse;
  let inputs = state.inputs;
  let output = state.output;
  let clear = state.clear;
  let error = false;
  let evaluated = false;

  switch (action.type) {
    case TOGGLE_MODE:
      mode = mode == MODE_RADIAN ? MODE_DEGREE : MODE_RADIAN;
      mexp.changeMode(mode == MODE_DEGREE);
      output = evaluateExpression(getExpression(inputs, mode));
      break;
    case TOGGLE_INVERSE:
      inverse = !inverse;
      break;
    case INPUT_NUMBER:
    case INPUT_OPERATOR:
    case INPUT_ADVANCED_OPERATOR:
      let item = action.payload;
      inputs = [...inputs, item];
      output = evaluateExpression(getExpression(inputs, mode));
      break;
    case CLEAR_LAST_CHARACTER:
      inputs = inputs.slice(0, inputs.length - 1);
      output = evaluateExpression(getExpression(inputs, mode));
      break;
    case CLEAR_EXPRESSION:
      if (inputs.length > 0) {
        inputs = [];
        output = '';
        clear = true;
      }
      break;
    case EVALUATE_EXPRESSION:
      try {
        const evaluation = mexp.eval(getExpression(inputs, mode));
        inputs = [{label: evaluation, value: evaluation}];
      } catch (e) {
        console.log(e);
        error = true;
        output = 'Bad expression';
        break;
      }
      evaluated = true;
      output = '';
      break;
    case RESET_CLEAR:
      clear = false;
      break;
  }
  return {
    ...state,
    mode: mode,
    inverse: inverse,
    inputs: inputs,
    output: output,
    clear: clear,
    evaluated: evaluated,
    error: error,
  };
};

export default calculatorReducer;
