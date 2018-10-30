import { createStore, applyMiddleware,compose } from "redux";
import reducer from "./reducer.js";
import thunk from "redux-thunk";

//redux中间件

//store 必须是唯一的，只有一个store公共存储空间，只有store可以改变自己的内容

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
  );

const store = createStore(
  reducer,
  enhancer
);

export default store;
