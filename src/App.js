import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import Homepage from "./homepage";
import Login from "./login";

import About from "./about";
import Team from "./team";
import TermsConditions from "./terms_conditions";

import "./App.css";
import logo from "./wavee.png";


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header className="app-header">
            <Link className="app-header-logo" to="/">
              <img className="header-logo" src={logo} alt="PITCH YOU" />
            </Link>
            <Link className="app-login-nav" to="/login">
              <FontAwesome className="login-icon" name="sign-in" />
              Login
            </Link>
          </header>

          <main className="app-container">
            <Route exact={true} path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/team" component={Team} />
            <Route path="/terms_condition" component={TermsConditions} />
          </main>

          <footer className="app-footer">
            <Link className="app-footer-link" to="/about">About</Link>
            <Link className="app-footer-link" to="/team">Team</Link>
            <Link className="app-footer-link" to="/terms_conditions">Terms & conditions</Link>
          </footer>
        </div>
      </Router>
    );
  }
}
