import React, { Component } from 'react';
import io from 'socket.io-client';
import { API_ROOT, API_ROOT_STATS } from './api-config';
import './Dashboard.css';
import PopularClicksChart from './PopularClicksChart.js';
import AreaSeriesChart from './AreaSeriesChart.js';
import ClicksByDayChart from './ClicksByDayChart.js';

const socket = io(API_ROOT);

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      messages:[],
      latestMessage: null,
      clickData: null,
      clickHistory: null
    };
    socket.on('event', (data) => {
      this.updateMessages(data);
    });
  }

  updateMessages(data) {
    // console.log(data);
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
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    // this.scrollToBottom();
    fetch(`${API_ROOT_STATS}/api/clickCount`)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      this.setState({
        clickData:data.map(e=>{
          return {x:e.count,y:e.button_id} 
        })
      });
    })
    .catch(error => {
      console.error(error.message); 
    });

    fetch(`${API_ROOT_STATS}/api/clickHistory`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        clickHistory:data.map(e=>{
          return {x:e.Day,y:e.clicks} 
        })
      });
    })
    .catch(error => {
      console.error(error.message); 
    });
  }

  componentDidUpdate() {
    // this.scrollToBottom();
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
            <p className="logo-text">Click History by Product</p>
            <PopularClicksChart clickData={this.state.clickData}/>
          </div>
          <div className="item2">
            <p className="logo-text">Live Clciks by Product</p>
            {this.state.latestMessage ? 
              <PopularClicksChart latestMessage={this.state.latestMessage}/>
              : <span>Waiting to receive data...</span>
            }
          </div>
          <div className="item3">
            <p className="logo-text">Click History by Day</p>
            <ClicksByDayChart clickHistory={this.state.clickHistory}/>
          </div>
          <div className="item4">
            <p className="logo-text">Live Click Histogram</p>
            <AreaSeriesChart latestMessage={this.state.latestMessage}/>
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
        </div>
      </div>
    );
  }
}

export default Dashboard;
