import * as actionType from "./actionType";

const defaultState = { focused: false };

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.SEARCH_FOCUS:
      return { focused: true };
    case actionType.SEARCH_BLUR:
      return { focused: false };

    default:
      return state;
  }
};
