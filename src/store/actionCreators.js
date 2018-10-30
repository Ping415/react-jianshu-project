import { GET_TODO_LIST, CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, GET_INIT_LIST } from "./actionTypes";

import axios from 'axios'

export const getTodoList = (value) => ({
  type: GET_TODO_LIST,
  value
})

export const changeInputValue = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const addTodoItem = () => ({
  type: ADD_TODO_ITEM,
})

export const deleteTodoItem = (value) => ({
  type: DELETE_TODO_ITEM,
  value
})


//redux-thunk
export const getTodoListAction = () => {
  return dispatch => {
    axios.get("/todoList").then(res => {
      if (res.data.code === 0) {
        const list = res.data.data.list.map(item => {
          return item.title;
        });
        const action = getTodoList(list);
        dispatch(action);
      } else {
        console.log("error");
      }

      console.log(res.data);
    });
  };
};

//redux-saga
export const getInitListAction =() => ({
  type: GET_INIT_LIST
})
