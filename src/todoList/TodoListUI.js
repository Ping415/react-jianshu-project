import React, { Fragment } from "react";

import { Input, Button, Form, List, Popconfirm, Avatar } from "antd";
const FormItem = Form.Item;

//当组件只有render函数时可以使用无状态组件, 性能更高，只负责UI组件渲染和简单逻辑
const TodoListUI = (props) => {
  const { getFieldDecorator } = props.form;
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
  const {
    inputValue,
    list,
    handleBtnClick,
    handleInputChange,
    handleDeleteItem,
    cancel
  } = props;
  return (
    // Fragment占位符
    <Fragment>
      <div>
        <Form
          onSubmit={handleBtnClick}
          style={{ width: "80%", margin: "auto" }}
        >
          {/* initialValue初始化值 */}
          <FormItem {...formItemLayout} label="输入内容">
            {getFieldDecorator("inputValue", {
              initialValue: inputValue,
              rules: [
                {
                  required: true,
                  message: "请输入内容"
                }
              ]
            })(
              <Input
                style={{ width: "80%" }}
                id="insertArea"
                onChange={handleInputChange}
                placeholder="请输入内容"
              />
            )}
            <Button
              type="primary"
              style={{ marginLeft: "10px" }}
              onClick={handleBtnClick}
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
        dataSource={list}
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
                onConfirm={
                  handleDeleteItem.bind(this,index)
                }
                onCancel={cancel}
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
// class TodoListUI extends Component {
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 4 }
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 }
//       }
//     };
//     const {
//       inputValue,
//       list,
//       handleBtnClick,
//       handleInputChange,
//       handleDeleteItem,
//       cancel
//     } = this.props;
//     return (
//       // Fragment占位符
//       <Fragment>
//         <div>
//           <Form
//             ref="form"
//             onSubmit={handleBtnClick}
//             style={{ width: "80%", margin: "auto" }}
//           >
//             {/* initialValue初始化值 */}
//             <FormItem {...formItemLayout} label="输入内容">
//               {getFieldDecorator("inputValue", {
//                 initialValue: inputValue,
//                 rules: [
//                   {
//                     required: true,
//                     message: "请输入内容"
//                   }
//                 ]
//               })(
//                 <Input
//                   style={{ width: "80%" }}
//                   ref={input => {
//                     this.input = input;
//                   }}
//                   id="insertArea"
//                   onChange={handleInputChange}
//                   placeholder="请输入内容"
//                 />
//               )}
//               <Button
//                 type="primary"
//                 style={{ marginLeft: "10px" }}
//                 onClick={handleBtnClick}
//               >
//                 提交
//               </Button>
//             </FormItem>
//           </Form>
//         </div>

//         {/* <ul
//           ref={ul => {
//             this.ul = ul;
//           }}
//         >
//           {this.getTodoItem()}
//         </ul> */}

//         <List
//           style={{ width: "70%", margin: "auto" }}
//           // header={<div>list</div>}
//           // footer={<div>Footer</div>}
//           bordered
//           dataSource={list}
//           renderItem={(item, index) => (
//             <List.Item>
//               {
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                   }
//                   title={index + 1}
//                   description={item}
//                 />
//               }
//               <div>
//                 <Popconfirm
//                   title="确定删除?"
//                   onConfirm={
//                     handleDeleteItem.bind(this,index)
//                   }
//                   onCancel={cancel}
//                   okText="确定"
//                   cancelText="取消"
//                 >
//                   <Button icon="delete" type="danger">
//                     删除
//                   </Button>
//                 </Popconfirm>
//               </div>
//             </List.Item>
//           )}
//         />
//       </Fragment>
//     );
//   }
// }

export default Form.create()(TodoListUI);
