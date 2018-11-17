import React, { Component } from 'react';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  scrollToBottom() {
    this.messagesElement.scrollTop=this.messagesElement.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const messageList = this.props.messages.map((m,i) =>
      <li key={i}>{m}</li>
    );
    return(
      <div className="container">
        <p>Message Log</p>
        <br/>
        <div className="messages" ref={(el) => { this.messagesElement = el; }}>
          <ul>
            {messageList}
          </ul>
        </div>
      </div>
    );
  }
}