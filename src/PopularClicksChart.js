import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  LineSeries,
  MarkSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
}from 'react-vis';

import React, { Component } from 'react';
import { API_ROOT } from './api-config';



export default class PopularClicksChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{x: 1, y: 'test'}]
    };
  }

  componentWillReceiveProps() {
    if(this.props.latestMessage) {
      const json = JSON.parse(this.props.latestMessage);
      switch (json.topic) {
        case 'edm-ui-click':
          console.log(json.properties.button_id);
          const buttonId = json.properties.button_id;
          const e = this.state.data.find((element) => {
            return element.y === buttonId;
          });
          if(e === undefined) {
            // create data
            this.setState({
              data:this.state.data.concat({x: 1, y: json.properties.button_id})
            });
          }else {
            //increment data
            e.x++;
          }
          break;
      case 'edm-ui-pageload': 
          break;
      default:
        console.log("default switch")
        break;
      }
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <XYPlot yType={'ordinal'} height={400} width={400}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
        <HorizontalBarSeries animation='gentle' data={this.state.data} />
      </XYPlot>
      </div>
    );
  }
}
