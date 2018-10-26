import React, { Component, Fragment } from "react";
import TodoItem from "./TodoItem";

// 当组件的props或state发生改变，render函数重新执行，页面发生改变
//Fragment占位符
class TodoList extends Component {
  //最优先执行
  constructor(props) {
    super(props); //继承
    //组件状态
    this.state = {
      inputValue: "",
      list: []
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  //挂载：组件第一次被放到页面时
  //当组件即将被挂载到页面时执行
  componentWillMount() {
    console.log('componentWillMount')
  }

  
  render() {
    console.log('render')
    return (
      <Fragment>
        <div>
          {/* 光标聚焦 */}
          <label htmlFor="insertArea">输入内容：</label>
          <input
            ref={input => {
              this.input = input;
            }}
            id="insertArea"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="请输入内容"
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>

        <ul
          ref={ul => {
            this.ul = ul;
          }}
        >
          {this.getTodoItem()}
        </ul>
      </Fragment>
    );
  }

  //页面挂载之后执行
  componentDidMount() {
    console.log('componentDidMount')
  }

  //组件更新前执行
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
    //false 组件不需更新
  }

  //组件更新之前，在shouldComponentUpdate后执行，shouldComponentUpdate但会true执行，false不执行
  componentWillUpdate() {
    console.log("componentWillUpdate")
  }

  //组件更新完成后执行
  componentDidUpdate() {
    console.log('componentDidUpdate')
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

  handleInputChange = e => {
    //异步
    //ref 尽量不要直接操作dom
    // const value = this.input.value
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }));
    // this.setState({ inputValue: e.target.value });
  };
  handleBtnClick = () => {
    //prevState之前的数据
    //setState 接收函数作为第二个参数，异步执行完函数后执行
    this.setState(
      prevState => ({
        list: [...prevState.list, prevState.inputValue],
        inputValue: ""
      }),
      () => {
        console.log(this.ul.querySelectorAll("div").length);
      }
    );

    // this.setState({
    //   //...展开运算符，将数组内容全部展开，拼接成新数组
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ""
    // });
  };
  handleDeleteItem(index) {
    //immutable state不允许做任何改变
    // const list = [...this.state.list];//拷贝list
    // list.splice(index,1);//修改副本

    // this.setState({
    //   list: list
    // })

    this.setState(prevState => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {
        list
      };
    });
  }
}

export default TodoList;
