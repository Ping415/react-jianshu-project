import { createStore } from "redux";
import reducer from "./reducer.js";

//store 必须是唯一的，只有一个store公共存储空间，只有store可以改变自己的内容
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
