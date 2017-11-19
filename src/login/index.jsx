import React, { Component } from "react";

import "./login.css";


export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <input
            ref={this.setEmail}
            type="text"
            className="login-input"
            placeholder="email address"
          />
          <input
            ref={this.setPassWord}
            type="password"
            className="login-input"
            placeholder="password"
          />
          <button onClick={this.onSubmit} className="login-button">
            Submit
          </button>
        </div>
      </div>
    );
  }


  setEmail = (node) => {
    this.emailNode = node;
  }

  setPassWord = (node) => {
    this.passwordNode = node;
  }

  onSubmit = () => {
    console.log(this.emailNode.value, this.passwordNode.value);
  }
}
