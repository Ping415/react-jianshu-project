import React, { Component, Fragment } from "react";
import "../mock/mock";
import axios from "axios";
import TodoItem from "./TodoItem";
import store from "../store";

import "./todoList.css";
import "antd/dist/antd.css";
import { Input, Button, Form, List, Popconfirm, Avatar } from "antd";
const FormItem = Form.Item;

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

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  //挂载：组件第一次被放到页面时
  //当组件即将被挂载到页面时执行
  componentWillMount() {
    // console.log("componentWillMount");
  }

  render() {
    // console.log("render");
    const { getFieldDecorator } = this.props.form;
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
          <Form
            ref="form"
            onSubmit={this.handleBtnClick}
            style={{ width: "80%", margin: "auto" }}
          >
            {/* initialValue初始化值 */}
            <FormItem {...formItemLayout} label="输入内容">
              {getFieldDecorator("inputValue", {
                initialValue: this.state.form.inputValue,
                rules: [
                  {
                    required: true,
                    message: "请输入内容"
                  }
                ]
              })(
                <Input
                  style={{ width: "80%" }}
                  ref={input => {
                    this.input = input;
                  }}
                  id="insertArea"
                  onChange={this.handleInputChange}
                  placeholder="请输入内容"
                />
              )}
              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={this.handleBtnClick}
              >
                提交
              </Button>
            </FormItem>
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
          style={{ width: "70%", margin: "auto" }}
          // header={<div>list</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item>
              {
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={index + 1}
                  description={item}
                />
              }
              <div>
                <Popconfirm
                  title="确定删除?"
                  onConfirm={this.handleDeleteItem.bind(this,index)}
                  onCancel={this.cancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button icon="delete" type="danger">
                    删除
                  </Button>
                </Popconfirm>
              </div>
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
        const action = {
          type: "get_todo_list",
          value: list
        };
        store.dispatch(action);
        // this.setState(() => ({
        //   list: list
        // }));
      } else {
        console.log("error");
      }

      console.log(res.data);
    });
  }

  handleInputChange = e => {
    const action = {
      type: "change_input_value",
      value: e.target.value
    };
    store.dispatch(action);
    //异步
    //ref 尽量不要直接操作dom
    // const value = this.input.value
    const value = e.target.value;
    this.setState(() => ({
      form: {
        inputValue: value
      }
    }));
    // this.setState({ inputValue: e.target.value });
  };

  handleStoreChange() {
    console.log("store change");
    this.setState(store.getState());
  }

  handleBtnClick = () => {
    //prevState之前的数据
    //setState 接收函数作为第二个参数，异步执行完函数后执行
    this.props.form.validateFields(err => {
      if (!err) {
        const action = {
          type: "add_todo_item"
        };
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
      }
      this.props.form.resetFields();
    });

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
    const list = [...this.state.list];
    list.splice(index, 1);
    const action = {
      type: "delete_list_item",
      value: list
    };
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
