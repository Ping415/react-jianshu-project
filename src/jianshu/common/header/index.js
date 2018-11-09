import React, {Component} from 'react'
import {Button, Icon } from 'antd'
import {HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition} from './style.js'

import './style.scss'

class Header extends Component{
  render() {
    return (
      <HeaderWrapper>
        <Logo/>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          <NavItem className='right'>登录</NavItem>
          <NavItem className='right'>
            {/* <i className="iconfont">&#xe636;</i> */}
            Aa
          </NavItem>
          <NavSearch>
          </NavSearch>
        </Nav>
        <Addition>
          <Button shape="circle" className="write" icon="edit">写文章</Button> 
          <Button shape="circle" className="reg">注册</Button>
          
        </Addition>
      </HeaderWrapper>
    )
  }
}

export default Header
