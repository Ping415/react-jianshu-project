import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group';
import { Button } from "antd";
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  Addition
} from "./style.js";

import "./style.scss";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  render() {
    return (
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right">
            {/* <i className="iconfont">&#xe636;</i> */}
            Aa
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={this.state.focused}
              timeout={200}
              className="slide"
            >
              <NavSearch
                className={this.state.focused ? "focused" : ""}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            </CSSTransition>
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button shape="circle" className="write" icon="edit">
            写文章
          </Button>
          <Button shape="circle" className="reg">
            注册
          </Button>
        </Addition>
      </HeaderWrapper>
    );
  }

  handleInputFocus = () => {
    this.setState({ focused: true });
  };

  handleInputBlur = () => {
    this.setState({ focused: false });
  };
}

export default Header;
