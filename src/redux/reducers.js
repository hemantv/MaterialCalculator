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
  expression: '',
  output: '',
  clear: false,
  error: null,
  previousExpressions: [],
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

const calculatorReducer = (state = initialState, action) => {
  let expression = state.expression;
  let output = state.output;
  let previousExpressions = state.previousExpressions;
  let clear = state.clear;
  let error = false;

  switch (action.type) {
    case INPUT_NUMBER:
    case INPUT_OPERATOR:
    case INPUT_ADVANCED_OPERATOR:
      let {label, value} = action.payload;
      expression = expression + value;
      output = evaluateExpression(expression);
      break;
    case CLEAR_LAST_CHARACTER:
      expression = state.expression.substr(0, state.expression.length - 1);
      output = evaluateExpression(expression);
      break;
    case CLEAR_EXPRESSION:
      if (expression.length > 0) {
        expression = '';
        output = evaluateExpression(expression);
        clear = true;
      }
      break;
    case EVALUATE_EXPRESSION:
      try {
        output = mexp.eval(expression);
      } catch (e) {
        console.log(typeof e);
        error = true;
        output = 'Bad expression';
        break;
      }
      expression = output + '';
      output = '';
      previousExpressions = [...previousExpressions, expression];
      break;
    case RESET_CLEAR:
      clear = false;
      break;
  }
  return {
    ...state,
    expression: expression,
    output: output,
    previousExpressions: previousExpressions,
    clear: clear,
    error: error,
  };
};

export default calculatorReducer;
