import React, {Component} from 'react'
import {Provider} from 'react-redux'
import Header from './common/header'
import store from './store'

import './statics/iconfont/iconfont'
class JianShu extends Component{
  render() {
    return(
      <Provider store={store}>
        <Header></Header>
      </Provider>
    )
  }
}

export default JianShu