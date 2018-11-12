import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./common/header";
import store from "./store";
import Home from './pages/home';
import Detail from './pages/detail'

import "./statics/iconfont/iconfont";
class JianShu extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <BrowserRouter>
            <div>
              <Route Path="/" exact component={Home} />
              <Route Path="/detail" exact component={Detail} />
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default JianShu;
