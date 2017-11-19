import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import Homepage from "./homepage";
import Login from "./login";

import "./App.css";


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header className="app-header">
            <Link className="app-header-logo" to="/">PITCH YOU</Link>
            <Link className="app-login-nav" to="/login">
              <FontAwesome className="login-icon" name="sign-in" size="1.5x" />
              Login
            </Link>
          </header>

          <main className="app-container">
            <Route exact={true} path="/" component={Homepage} />
            <Route path="/login" component={Login} />
          </main>

          <footer className="app-footer" />
        </div>
      </Router>
    );
  }
}
