import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  LineSeries,
  AreaSeries,
  MarkSeries,
  makeWidthFlexible,
  VerticalBarSeriesCanvas,
  LabelSeries,
  DiscreteColorLegend,
  VerticalBarSeries
}from 'react-vis';

import React, { Component } from 'react';
import { API_ROOT } from './api-config';

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

export default class AreaLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }

  componentDidMount() {

  }

  componentWillUnmount(){

  }

  componentWillReceiveProps(newProps) {

  }



// <VerticalBarSeries animation='gentle' data={[{x: "test", y: 10}, {x: "test1", y: 5}, {x: "test3", y: 15}]}/>
  render() {
    console.log("click history:",this.props.clickHistory);
    return (
      <div>
      { this.props.clickHistory ? <FlexibleXYPlot xType="ordinal" height={400}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
        <VerticalBarSeries animation='gentle' data={this.props.clickHistory}/>
      </FlexibleXYPlot>
      : <div></div> }
      </div>
    );
  }
}
