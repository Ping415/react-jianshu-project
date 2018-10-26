import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    //this指向
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      //父组件向子组件传值
      <div onClick={this.handleClick}>{this.props.content}</div>
    );
  }
  handleClick() {
    //子组件修改父组件内容
    // console.log(this.props.index);
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }
}

export default TodoItem;
