import {
  getTodoList,
  changeInputValue,
  addTodoItem,
  deleteTodoItem
} from "./actionCreators.js";
import axios from "axios";

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
