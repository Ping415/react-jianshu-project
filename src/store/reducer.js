//管理数据
//获取之前的数据，返回新的数据给store
import {
  GET_TODO_LIST,
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM
} from "./actionTypes.js";
const defaultState = {
  form: {
    inputValue: "qqq"
  },
  list: []
};

//reducer可以接收state但绝不可以修改state
export default (state = defaultState, action) => {
  if (action.type === GET_TODO_LIST) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.value;
    return newState;
  }

  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.form.inputValue = action.value;
    return newState;
  }

  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.form.inputValue);
    newState.form.inputValue = "";
    return newState;
  }

  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.value;
    console.log(newState);
    return newState;
  }
  console.log(state, action);
  return state;
};
