import React, { Component, Fragment } from "react";
import TodoItem from "./TodoItem";

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
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }));
    // this.setState({ inputValue: e.target.value });
  };
  handleBtnClick = () => {
    //prevState之前的数据
    this.setState(prevState => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ""
    }));
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
  render() {
    return (
      <Fragment>
        <div>
          {/* 光标聚焦 */}
          <label htmlFor="insertArea">输入内容：</label>
          <input
            id="insertArea"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="请输入内容"
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>

        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }
}

export default TodoList;
