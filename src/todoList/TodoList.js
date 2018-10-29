import React, { Component, Fragment } from "react";
import "../mock/mock";
import axios from "axios";
import TodoItem from "./TodoItem";

import "./todoList.css";
import "antd/dist/antd.css";
import { Input, Button, Form, List, Popconfirm, message } from "antd";
const FormItem = Form.Item;

// 当组件的props或state发生改变，render函数重新执行，页面发生改变

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
    // console.log("componentWillMount");
  }

  render() {
    // console.log("render");
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      // Fragment占位符
      <Fragment>
        <div>
          <Form onSubmit={this.handleBtnClick}>
            <FormItem {...formItemLayout} label="输入内容">
              {/* 光标聚焦 */}
              {/* <label htmlFor="insertArea">输入内容：</label> */}
              <Input
                style={{ width: "80%" }}
                ref={input => {
                  this.input = input;
                }}
                id="insertArea"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
                placeholder="请输入内容"
              />{" "}
              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={this.handleBtnClick}
              >
                提交
              </Button>
            </FormItem>
            <FormItem />
          </Form>
        </div>

        {/* <ul
          ref={ul => {
            this.ul = ul;
          }}
        >
          {this.getTodoItem()}
        </ul> */}

        <List
          style={{ width: "80%", margin: "auto" }}
          // header={<div>list</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={this.state.list}
          renderItem={item => (
            <List.Item>
              {item}
              <Popconfirm
                title="确定删除?"
                onConfirm={this.handleDeleteItem}
                onCancel={this.cancel}
                okText="确定"
                cancelText="取消"
              >
                <Button icon='delete' type="danger">删除</Button>
              </Popconfirm>
            </List.Item>
          )}
        />
      </Fragment>
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
    axios.get("/number").then(res => {
      if (res.data.code === 0) {
        const list = res.data.data.list.map(item => {
          return item.title;
        });
        this.setState(() => ({
          list: list
        }));
      } else {
        console.log("error");
      }

      console.log(res.data);
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
        // console.log(this.ul.querySelectorAll("div").length);
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
  cancel() {
    console.log("cancel")
  }
}



export default Form.create()(TodoList);
