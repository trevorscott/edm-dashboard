import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  LineSeries,
  MarkSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
}from 'react-vis';

import React, { Component } from 'react';
import { API_ROOT } from './api-config';



export default class ClicksChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicks:0,
			loads:0
		};
	}

// this.setState({ count: this.state.count + 1 })
  componentWillReceiveProps(newProps) {
    if(newProps.latestMessage) {
      const json = JSON.parse(newProps.latestMessage);
      switch (json.topic) {
        case 'edm-ui-click':
          this.setState({
            clicks:this.state.clicks + 1
          });
          break;
        case 'edm-ui-pageload': 
          this.setState({
            loads:this.state.loads + 1
          });
          break;
      default:
        console.log("default switch")
        break;
      }
    }
  }

  render() {
    const clicksData = [
      {y: this.state.clicks,x: 'Clicks', color:'#3cadff'},
      {y: this.state.loads,x: 'Loads',  color:'ffeb30'}, 
    ];
    const loadsData = [
      
    ];


    return (
      <div>
        <XYPlot xType="ordinal" height={400} width={400}>
          <XAxis attr="x" attrAxis="y" orientation="bottom"/>
          <YAxis attr="y" attrAxis="x" orientation="left"/>
    		  <VerticalBarSeries animation='gentle' data={clicksData} />
    		</XYPlot>
      </div>
    );
  }
}
