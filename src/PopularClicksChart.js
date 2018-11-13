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
      data: []
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.latestMessage) {
      const json = JSON.parse(newProps.latestMessage);
      switch (json.topic) {
        case 'edm-ui-click':
          console.log(json.properties.button_id);
          const buttonId = json.properties.button_id;
          const e = this.state.data.find((element) => {
            return element.y === buttonId;
          });
          console.log('element:'+e);
          if(e === undefined) {
            // create data
            this.setState({
              data:this.state.data.concat({x: 1, y: json.properties.button_id})
            });
            break;
          }else {
            //increment data
            e.x++;
            break;
          }
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
        <XYPlot yType={'ordinal'} height={400} width={600} margin={{left: 200}}>
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
