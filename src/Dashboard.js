import React, { Component } from 'react';
import io from 'socket.io-client';
import { API_ROOT } from './api-config';
import './Dashboard.css';
import ClicksChart from './ClicksChart.js';
import PopularClicksChart from './PopularClicksChart.js';

const socket = io(API_ROOT);

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      messages:[],
      latestMessage: null
    };
    socket.on('event', (data) => {
      this.updateMessages(data);
    });
  }

  updateMessages(data) {
    console.log(data);
    if(this.state.messages) {
      this.setState({
        messages:this.state.messages.concat(data),
        latestMessage:data
      })
    }else {
      this.setState({
        messages:[data]
      })
    }
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const messageList = this.state.messages.map((m) =>
      <li>{m}</li>
    );
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="grid-container">
          <div className="item1">
            <p>Historical Event Count</p>
            <ClicksChart latestMessage={this.state.latestMessage}/>
          </div>
          <div className="item5">
            <div className="container">
              <p>Message Log</p>
              <br/>
              <div className="messages">
                <ul>
                  {messageList}
                </ul>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
              </div>
            </div>
          </div>
          <div className="item2">
            <p>Popular Clicks Chart</p>
            <PopularClicksChart latestMessage={this.state.latestMessage}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
