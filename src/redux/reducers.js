const {
  INPUT_NUMBER,
  INPUT_OPERATOR,
  CLEAR_LAST_INPUT: CLEAR_LAST_CHARACTER,
  CLEAR_EXPRESSION,
  EVALUATE_EXPRESSION,
  RESET_CLEAR,
  RESET_ERROR,
  INPUT_ADVANCED_OPERATOR,
} = require('./actions');
import * as mexp from 'math-expression-evaluator';

const initialState = {
  inputs: [],
  output: '',
  clear: false,
  error: null,
};

const evaluateExpression = (expression) => {
  let output;
  try {
    output = mexp.eval(expression);
  } catch (e) {
    console.log(e);
  }
  return output;
};

const getExpression = (inputs) => {
  return inputs.map((item) => item.value).join('');
};

const calculatorReducer = (state = initialState, action) => {
  let inputs = state.inputs;
  let output = state.output;
  let clear = state.clear;
  let error = false;

  switch (action.type) {
    case INPUT_NUMBER:
    case INPUT_OPERATOR:
    case INPUT_ADVANCED_OPERATOR:
      let item = action.payload;
      inputs = [...inputs, item];
      output = evaluateExpression(getExpression(inputs));
      break;
    case CLEAR_LAST_CHARACTER:
      inputs = inputs.slice(0, inputs.length - 1);
      output = evaluateExpression(getExpression(inputs));
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
        const evaluation = mexp.eval(getExpression(inputs));
        inputs = [{label: evaluation, value: evaluation}];
      } catch (e) {
        console.log(e);
        error = true;
        output = 'Bad expression';
        break;
      }
      output = '';
      break;
    case RESET_CLEAR:
      clear = false;
      break;
  }
  return {
    ...state,
    inputs: inputs,
    output: output,
    clear: clear,
    error: error,
  };
};

export default calculatorReducer;
