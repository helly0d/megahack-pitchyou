import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";
import { Redirect } from "react-router";

import { loginUser } from "../redux/action_creators";
import "./login.css";


class Login extends Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  render() {
    if (this.props.isLogged) {
      return <Redirect push={true} to="/myaccount" />;
    }

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
    const body = {
      email: this.emailNode.value,
      password: this.passwordNode.value,
    };

    request.post("/api/login").set("accept", "json").send(body).
      end((err, res) => {
        if (!err) {
          this.props.onLogin(JSON.parse(res.text));
        }
      });
  }
}

export default connect(
  (state) => {
    return { isLogged: !!state.pitch.user };
  },
  (dispatch) => {
    return { onLogin: (user) => dispatch(loginUser(user)) };
  }
)(Login);
