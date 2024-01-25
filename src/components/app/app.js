import React, { Component } from 'react';

import Nav from '../nav';
import CostInputForm from '../cost-input-form'

import './app.css';
import NotificationCheck from '../notification-check';
import CostsReport from '../costs-report';

export default class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <CostsReport />
        <CostInputForm />
      </div>
    );
  }
}
