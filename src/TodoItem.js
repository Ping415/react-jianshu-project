import React, { Component } from "react";
import PropTypes from "prop-types";

//当父组件的render重新执行时，子组件的render也会重新运行
class TodoItem extends Component {
  constructor(props) {
    super(props);
    //this指向
    this.handleClick = this.handleClick.bind(this);
  }

  //当一个组件从父组件接受参数，只要父组件的render函数被重新执行，子组件的这个生命周期函数就被执行
  //如果这个组件第一次存在于父组件中，不会执行，如果已经存在，被执行
  componentWillReceiveProps() {
    console.log('child componentWillReceiveProps')
  }

  
  //当组件即将被页面中移除
  componentWillUnmount() {
    console.log('child componentWillUnmount')
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
//类型校验
TodoItem.propTypes = {
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
};

//默认值
TodoItem.defaultProps = {};

export default TodoItem;
