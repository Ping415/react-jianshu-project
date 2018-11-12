import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
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
import { actionCreators } from "./store/index";

class Header extends Component {
  render() {
    const { focused, handleInputFocus, handleInputBlur } = this.props;
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
            <CSSTransition in={focused} timeout={200} classNames="slide">
              <NavSearch
                className={focused ? "focused" : ""}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
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

}
const mapStateToProps = state => {
  return {
    focused: state.header.get("focused")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleInputFocus() {
      const action = actionCreators.searchFocus();
      dispatch(action);
    },
    handleInputBlur() {
      const action = actionCreators.searchBlur();
      dispatch(action);
    }
  };
};
//mapStateToProps,mapDispatchToProps
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
