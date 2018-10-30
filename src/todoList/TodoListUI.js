import React, {Component, Fragment} from 'react'

import { Input, Button, Form, List, Popconfirm, Avatar } from "antd";
const FormItem = Form.Item;

class TodoListUI extends Component {
  render() {
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
            onSubmit={this.props.handleBtnClick}
            style={{ width: "80%", margin: "auto" }}
          >
            {/* initialValue初始化值 */}
            <FormItem {...formItemLayout} label="输入内容">
              {getFieldDecorator("inputValue", {
                initialValue: this.props.inputValue,
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
                  onChange={this.props.handleInputChange}
                  placeholder="请输入内容"
                />
              )}
              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                onClick={this.props.handleBtnClick}
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
          dataSource={this.props.list}
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
                  onConfirm={(index) => {this.props.handleDeleteItem(index)}}
                  onCancel={this.props.cancel}
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
}

export default Form.create()(TodoListUI)