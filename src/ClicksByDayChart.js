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
    // console.log(this.props.clickHistory);
    let maxDomain = 50;
    if (this.props.clickHistory) {
      let arr = this.props.clickHistory.map(e=>{
        return e.y;
      });
      maxDomain = Math.max.apply(null,arr);
    }
    console.log(maxDomain);
    return (
      <div>
      { this.props.clickHistory ?
          this.props.width ?
            <XYPlot width={this.props.width} xType="ordinal" height={400} yDomain={[0,maxDomain]}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Date"/>
              <YAxis title="Clicks"/>
              <VerticalBarSeries animation='gentle' data={this.props.clickHistory}/>
            </XYPlot>
          :
            <FlexibleXYPlot xType="ordinal" height={400} yDomain={[0,maxDomain]}>
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
