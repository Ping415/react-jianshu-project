
//管理数据
const defaultState = {
  form: {
    inputValue: '',
  },
  list: []
}

//reducer可以接收state但绝不可以修改state
export default (state = defaultState, action) => {
  if(action.type === 'get_state_list') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = action.value;
    return newState
  }

  if(action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.form.inputValue = action.value;
    return newState
  }

  if(action.type === 'add_todo_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.form.inputValue)
    newState.form.inputValue = ''
    return newState
  }
  console.log(state, action)
  return state;
};
