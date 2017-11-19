import React, { Component } from "react";

import logo from "../inviewblack.png";
import "./homepage.css";


export default class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="homepage-description">
          <img className="homepage-logo" src={logo} alt="INview" />
        </div>
      </div>
    );
  }
}
