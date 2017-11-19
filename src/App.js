import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Homepage from "./homepage";
import Login from "./login";

import "./App.css";


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">PITCH you</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>

            <hr />
          </header>

          <p className="App-intro">
            <div>
              <Route exact={true} path="/" component={Homepage} />
              <Route path="/login" component={Login} />
            </div>
          </p>
        </div>
      </Router>
    );
  }
}
