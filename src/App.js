import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AccountMenu from "./account_menu";
import Homepage from "./homepage";
import Login from "./login";

import About from "./about";
import Team from "./team";
import TermsConditions from "./terms_conditions";
import Dashboard from "./dashboard";

import { Provider } from "react-redux";
import { createStore } from "redux";
import pitchApp from "./redux/reducers";

import "./App.css";
import logo from "./inviewwhite.png";


const store = createStore(pitchApp);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <header className="app-header">
              <Link className="app-header-logo" to="/">
                <img className="header-logo" src={logo} alt="PITCH YOU" />
              </Link>
              <AccountMenu />
            </header>

            <main className="app-container">
              <Route exact={true} path="/" component={Homepage} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <Route path="/team" component={Team} />
              <Route path="/myaccount" component={Dashboard} />
              <Route path="/terms_condition" component={TermsConditions} />
            </main>

            <footer className="app-footer">
              <Link className="app-footer-link" to="/about">About</Link>
              <Link className="app-footer-link" to="/team">Team</Link>
              <Link className="app-footer-link" to="/terms_conditions">Terms & conditions</Link>
            </footer>
          </div>
        </Router>
      </Provider>
    );
  }
}
