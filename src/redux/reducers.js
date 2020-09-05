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
} = require('./actions');
import mexp from 'math-expression-evaluator';

const initialState = {
  mode: 'RAD',
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

const getExpression = (inputs, mode) => {
  return inputs.map((item) => item.value).join('');
};

const calculatorReducer = (state = initialState, action) => {
  let mode = state.mode;
  let inputs = state.inputs;
  let output = state.output;
  let clear = state.clear;
  let error = false;

  switch (action.type) {
    case TOGGLE_MODE:
      mode = mode == 'RAD' ? 'DEG' : 'RAD';
      mexp.changeMode(mode == 'DEG');
      output = evaluateExpression(getExpression(inputs, mode));
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
        inputs = [{label: 'sin(30)', value: 'sin(30)'}];
        const evaluation = mexp.eval(getExpression(inputs, mode));
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
    mode: mode,
    inputs: inputs,
    output: output,
    clear: clear,
    error: error,
  };
};

export default calculatorReducer;
