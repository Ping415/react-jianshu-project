import React, { Component } from "react";
import "../mock/mock";
// import axios from "axios";
import TodoItem from "./TodoItem";
import TodoListUI from "./TodoListUI";
import store from "../store";
import {
  getTodoList,
  changeInputValue,
  addTodoItem,
  deleteTodoItem,
  getTodoListAction,
  getInitListAction
} from "../store/actionCreators.js";
import "./todoList.css";
import "antd/dist/antd.css";
import {  Form,  message } from "antd";

// 当组件的props或state发生改变，render函数重新执行，页面发生改变

class TodoList extends Component {
  //最优先执行
  constructor(props) {
    super(props); //继承
    console.log(store.getState());
    //组件状态
    // this.state = {
    //   form: {
    //     inputValue: ""
    //   },

    //   list: []
    // };
    this.state = store.getState();

    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    //监听store变化
    store.subscribe(this.handleStoreChange);
  }

  //挂载：组件第一次被放到页面时
  //当组件即将被挂载到页面时执行
  componentWillMount() {
    // console.log("componentWillMount");
  }

  render() {
    // console.log("render");
    return (
      <TodoListUI
        form={this.props.form}
        inputValue={this.state.form.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        handleDeleteItem={this.handleDeleteItem}
        cancel={this.cancel}
      />
    );
  }

  //页面挂载之后执行
  componentDidMount() {
    // console.log("componentDidMount");
    this.getItemContent();
  }

  //组件更新前执行
  shouldComponentUpdate() {
    // console.log("shouldComponentUpdate");
    return true;
    //false 组件不需更新
  }

  //组件更新之前，在shouldComponentUpdate后执行，shouldComponentUpdate但会true执行，false不执行
  componentWillUpdate() {
    // console.log("componentWillUpdate");
  }

  //组件更新完成后执行
  componentDidUpdate() {
    // console.log("componentDidUpdate");
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          key={index}
          content={item}
          index={index}
          deleteItem={this.handleDeleteItem}
        />
      );
    });
  }

  getItemContent() {

    //redux-saga
    //const action = getInitListAction()
    //store.dispatch(action)

    //redux-thunk
    const action = getTodoListAction();
    store.dispatch(action);

    //init
    // axios.get("/todoList").then(res => {
    //   if (res.data.code === 0) {
    //     const list = res.data.data.list.map(item => {
    //       return item.title;
    //     });
    //     const action = getTodoList(list);
    //     store.dispatch(action);
    //     // this.setState(() => ({
    //     //   list: list
    //     // }));
    //   } else {
    //     console.log("error");
    //   }

    //   console.log(res.data);
    // });
  }

  handleInputChange = e => {
    const action = changeInputValue(e.target.value);
    store.dispatch(action);
    //异步
    //ref 尽量不要直接操作dom
    // const value = this.input.value

    // const value = e.target.value;
    // this.setState(() => ({
    //   form: {
    //     inputValue: value
    //   }
    // }));
    // this.setState({ inputValue: e.target.value });
  };

  handleStoreChange() {
    // console.log("store change");
    this.setState(store.getState());
  }

  handleBtnClick() {
    //prevState之前的数据
    //setState 接收函数作为第二个参数，异步执行完函数后执行
    const form = this.props.form;
    form.validateFields(err => {
      if (!err && this.state.form.inputValue !== "") {
        const action = addTodoItem();
        store.dispatch(action);
        // this.setState(
        //   prevState => ({
        //     list: [...prevState.list, prevState.form.inputValue]
        //   }),
        //   () => {
        //
        //     // console.log(this.ul.querySelectorAll("div").length);
        //   }
        // );
      } else {
        message.error("请输入内容");
      }
      form.resetFields();
    });

    // this.setState({
    //   //...展开运算符，将数组内容全部展开，拼接成新数组
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ""
    // });
  }
  handleDeleteItem(index) {
    //immutable state不允许做任何改变
    // const list = [...this.state.list];//拷贝list
    // list.splice(index,1);//修改副本

    // this.setState({
    //   list: list
    // })
    const list = [...this.state.list];
    list.splice(index, 1);
    const action = deleteTodoItem(list);
    store.dispatch(action);

    // this.setState(prevState => {
    //   const list = [...prevState.list];
    //   list.splice(index, 1);
    //   return {
    //     list
    //   };
    // });
  }
  cancel() {
    console.log("cancel");
  }
}

export default Form.create()(TodoList);
