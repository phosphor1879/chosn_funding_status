import React, { Component } from 'react';
import './App.css';
import getMonthlyNeed from './getMonthlyNeed';

const FUND_ADDRESS = "FKZB5JeUKVCJYY6svRD1WGpJkxnu6KfSti";
const FUND_ADDR_URL = `http://explore.placeh.io:8080/address/${FUND_ADDRESS}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      goal: null,
      balance: null
    };
  }
  componentWillMount() {
    getMonthlyNeed().then((need)=>{
      this.setState({
        goal: need
      });
    });
    fetch('/.netlify/functions/getAddress')
      .then(response => response.json())
      .then(json => this.setState({ loading: false, balance: Math.round(json.balance) || 0 }));
  }
  render() {
    const {loading, goal, balance} = this.state;
    const progress = Math.floor(( balance / goal ) * 100);
    const runway = Math.floor(balance / goal);
    if (loading) {
      return (
        <div className="App">
          <header className="App-header">
            Loading
          </header>
        </div>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            { balance > goal ? <p>
              We can operate the servers for another {runway} month(s). Thank you!
            </p> : <p>We are still short {goal - balance} PHL for the month. Please donate!</p> }
            <p>Contribute <a href="https://placeh.io">PHL</a> to <a href={FUND_ADDR_URL}>{FUND_ADDRESS}</a></p>
            <p>Balance: {balance} PHL</p>
            <p>Goal: {goal} PHL</p>
            <p>Progress: {progress}%</p>
          </header>
        </div>
      );
    }
  }
}

export default App;
