import { GET_TODO_LIST, CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from "./actionTypes";

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