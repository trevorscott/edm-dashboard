import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  makeWidthFlexible,
  VerticalBarSeries
}from 'react-vis';

import React from 'react';

const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

export default class AreaLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }

  render() {
    return (
      <div>
      { this.props.clickHistory ?
          this.props.width ?
            <XYPlot width={this.props.width} xType="ordinal" height={400}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Date"/>
              <YAxis title="Clicks"/>
              <VerticalBarSeries animation='gentle' data={this.props.clickHistory}/>
            </XYPlot>
          :
            <FlexibleXYPlot xType="ordinal" height={400}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Date"/>
              <YAxis title="Clicks"/>
              <VerticalBarSeries animation='gentle' data={this.props.clickHistory}/>
            </FlexibleXYPlot>
        :
          <div></div>  
      }
      </div>
    );
  }
}
