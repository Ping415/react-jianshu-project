import React, { Component } from "react";
import { HomeWrapper, HomeLeft, HomeRight } from "./style";

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>left</HomeLeft>
        <HomeRight>rigth</HomeRight>
      </HomeWrapper>
    );
  }
}

export default Home;
