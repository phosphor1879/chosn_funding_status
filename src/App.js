import React, { Component } from 'react';
import './App.css';
import getAddress from './getAddress';
import getMonthlyNeed from './getMonthlyNeed';

const FUND_ADDRESS = "FKZB5JeUKVCJYY6svRD1WGpJkxnu6KfSti";
const FUND_ADDR_URL = `http://explore.placeh.io:8080/address/${FUND_ADDRESS}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    getAddress(FUND_ADDRESS).then((addr)=>{
      this.setState({
        balance: Math.round(addr.balance) || 0
      });
    });
  }
  render() {
    const {goal, balance} = this.state;
    const progress = Math.floor(( balance / goal ) * 100);
    const runway = Math.floor(balance / goal);
    return (
      <div className="App">
        <header className="App-header">
          { balance > goal ? <p>
            We have enough to survive for another {runway} months.
          </p> : <p>We don't have enough to survive this month. Please donate!</p> }
          <p>Progress: {progress}%</p>
          <p>Contribute PHL to <a href={FUND_ADDR_URL}>{FUND_ADDRESS}</a></p>
          <p>Balance: {balance} PHL</p>
          <p>Goal: {goal} PHL</p>
        </header>
      </div>
    );
  }
}

export default App;
