import React, { Component } from 'react';
import io from 'socket.io-client';
import { API_ROOT, API_ROOT_STATS } from './api-config';
import './Dashboard.css';
import PopularClicksChart from './PopularClicksChart.js';
import AreaSeriesChart from './AreaSeriesChart.js';
import ClicksByDayChart from './ClicksByDayChart.js';
import MessageList from './MessageList.js';
import { DiscreteColorLegend } from 'react-vis';

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
      clickHistory: null,
      width:0,
      height:0,
      chartWidth:400
    };
    socket.on('event', (data) => {
      this.updateMessages(data);
    });
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateWindowDimensions() {
    let chartWidth;
    if (window.innerWidth > 1000) {
      chartWidth = Math.floor(window.innerWidth/2 -  40);
    }else {
      chartWidth = 0;
    }
    this.setState({ 
      width: window.innerWidth,
      height: window.innerHeight,
      chartWidth: chartWidth
    });
  }

  updateMessages(data) {
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

  componentDidMount() {
    console.log(`Listening for events from ${API_ROOT}`);
    console.log(`Querying historical data from ${API_ROOT_STATS}`);
    
    //calculate window size for charts
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    //get the historical click count per product
    fetch(`${API_ROOT_STATS}/api/clickCount`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        clickData:data.map(e=>{
          let num = parseInt(e.sum);
          if (isNaN(num)) { num=0 }
          return {x:num,y:e.button_id} 
        })
      });
    })
    .catch(error => {
      console.error(error.message); 
    });

    // get the total clicks per day history
    fetch(`${API_ROOT_STATS}/api/clickHistory`)
    .then(response => response.json())
    .then(data => {
      const finalClickHistoryData = data.filter(e => {
        if (e.clicks) return true;
        else return false;
      }).map(e => {
        const d = new Date(e.Day);
        return {x:d.toLocaleDateString("en-US"),y:e.clicks} 
      })
      this.setState({
        clickHistory:finalClickHistoryData
      });
    })
    .catch(error => {
      console.error(error.message); 
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1> 
        <div className="flex-grid">
          <div className="col">
            <p className="title">Button Clicks</p>
            <div className="chart-wrapper">
              <PopularClicksChart title="Clicks" width={this.state.chartWidth} clickData={this.state.clickData}/>
            </div>
          </div>
          <div className="col">
            <p className="title">Live Button Clicks</p>
            <div className="chart-wrapper">
              {
                this.state.latestMessage ?
                  <PopularClicksChart title="Clicks" width={this.state.chartWidth} latestMessage={this.state.latestMessage}/> 
                : <p className="waiting">Waiting for data...</p>
              }
            </div>
          </div>
        </div>
        <div className="flex-grid">
          <div className="col">
            <p className="title">Clicks Per Day</p>
            <div className="chart-wrapper">
              <ClicksByDayChart width={this.state.chartWidth} clickHistory={this.state.clickHistory}/>
            </div>
          </div>
          <div className="col">
            <p className="title">Clicks Per Second</p>
            <div className="chart-wrapper">
              <AreaSeriesChart width={this.state.chartWidth} latestMessage={this.state.latestMessage}/>
            </div>
            <DiscreteColorLegend 
              colors={[
                '#12939a',
                '#79c7e3'
              ]}
              items={[
                'Button Clicks',
                'Page Loads'
              ]}
              orientation="horizontal"
            />
          </div>
        </div>
        <div className="message-list">
          <MessageList messages={this.state.messages}/>
        </div>
          
      </div>
    );
  }
}

export default Dashboard;
