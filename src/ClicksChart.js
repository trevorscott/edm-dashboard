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

  render() {
    const data = [
      {x: 'Clicks', y: this.state.clicks},
      {x: 'Loads', y: this.state.loads}
    ];
    if(this.props.latestMessage) {
      const json = JSON.parse(this.props.latestMessage);
      switch (json.topic) {
        case 'edm-ui-click':
          this.state.clicks++;
          break;
      case 'edm-ui-pageload': 
          this.state.loads++;
          break;
      default:
        console.log("default switch")
        break;
      }
    }
    return (
      <div>
        <XYPlot xType="ordinal" height={400} width={400}>
          <XAxis />
          <YAxis />
		  <VerticalBarSeries animation='gentle' data={data} />
		</XYPlot>
      </div>
    );
  }
}
