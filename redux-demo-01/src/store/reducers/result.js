import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  results: []
};

const deleteResult = (state, action) => {
  const updatedArray = state.results.filter(result => result.id !== action.resultElId);   // array.filter() return a new array
  return updateObject(state, {results: updatedArray});
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(
        state, 
        {results: state.results.concat({id: (new Date()).getTime(), value: action.result})}// array.concat() return a new array
      );
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);
  }
  return state;
};

export default reducer;