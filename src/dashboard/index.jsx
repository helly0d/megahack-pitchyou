import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import FontAwesome from "react-fontawesome";
import request from "superagent";

import weekStats from "./7days.png";
import monthStats from "./30days.png";

import "./dashboard.css";


class Dashboard extends Component {
  static propTypes = { user: PropTypes.object.isRequired }

  state = { banks: [] }

  componentWillReceiveProps(newProps) {
    if (!this.state.banks.length && newProps.user && !this.state.loadingBanks) {
      this.setState({ loadingBanks: true });

      request.get("/api/psd2/banks?country=ro").set("accept", "application/json").end((err, res) => {
        this.setState({ banks: JSON.parse(res.text)._embedded.banks });
      });
    }
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }

    return (
      <div className="dashboard-container">
        <div className="dashboard-member">
          <div className="dashboard-avatar" >
            <FontAwesome className="avatar-icon" name="user" size="5x" />
          </div>

          <div className="dashboard-name">
            {user.firstName} {user.lastName}
          </div>

          {this.renderBanks()}
        </div>

        <div className="dashboard-stats">
          <div className="weekly-stats">
            Last 7 days investment stats
            <img src={weekStats} alt="Last 7 days" />
          </div>
          <div className="monthly-stats">
            Last 30 days investment stats
            <img src={monthStats} alt="Last 30 days" />
          </div>
        </div>
      </div>
    );
  }

  renderBanks() {
    const { banks } = this.state;
    if (!banks.length) {
      return null;
    }

    return (
      <div className="dashboard-banks-container">
        <hr />
        Your banks
        <div className="dashboard-banks">
          {banks.map((bank) => {
            if (bank.logo) {
              return <img key={bank.logo} className="banks-logo" src={bank.logo} alt={bank.fullName} />;
            }

            return null;
          })}
        </div>
      </div>
    );
  }
}


export default connect(
  (state) => {
    return { user: state.pitch.user };
  }
)(Dashboard);
