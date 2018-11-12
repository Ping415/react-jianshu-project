import * as actionType from "./actionType";
import { fromJS } from "immutable";
//immutable 不可改变的 返回immutable类型数据
//immutable set 结合之前immutable之前对象的值和设置的值，返回全新的对象

const defaultState = fromJS({ focused: false });

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.SEARCH_FOCUS:
      return state.set('focused', true);
    case actionType.SEARCH_BLUR:
      return state.set('focused', false);

    default:
      return state;
  }
};
