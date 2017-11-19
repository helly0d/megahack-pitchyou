import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

import { loginUser } from "./redux/action_creators";
import request from "superagent";


class AccountMenu extends Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  static defaultProps = { user: {} }

  componentDidMount() {
    request.get("/api/account").end((err, res) => {
      if (!err) {
        this.props.onLogin(JSON.parse(res.text));
      }
    });
  }

  render() {
    return this.props.isLogged ? this.renderMenu() : this.renderLogin();
  }

  renderMenu() {
    const { user } = this.props;

    return (
      <div className="app-account-details">
        <Link className="app-notification-bell" to="/notifications">
          <FontAwesome className="login-icon" name="bell" size="2x" />
        </Link>
        <Link className="app-my-account-nav" to="/myaccount">
          {user.firstName} {user.lastName}
        </Link>
      </div>
    );
  }

  renderLogin() {
    return (
      <Link className="app-login-nav" to="/login">
        <FontAwesome className="login-icon" name="sign-in" />
        Login
      </Link>
    );
  }
}


export default connect(
  (state) => {
    return {
      isLogged: !!state.pitch.user,
      user: { ...state.pitch.user },
    };
  },
  (dispatch) => {
    return { onLogin: (user) => dispatch(loginUser(user)) };
  }
)(AccountMenu);
