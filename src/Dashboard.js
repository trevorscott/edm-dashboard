import React, { Component } from 'react';
import io from 'socket.io-client';
import { API_ROOT } from './api-config';
import './Dashboard.css';

const socket = io(API_ROOT);

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      messages:[]
    };
    socket.on('event', (data)=> {
      this.updateMessages(data);
    });
  }

  updateMessages(data) {
    console.log(data);
    if(this.state.messages) {
      this.setState({
        messages:this.state.messages.concat(data)
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
    const messageList = this.state.messages.map((m)=>
      <li>{m}</li>
    );
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
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
    );
  }
}

export default Dashboard;
