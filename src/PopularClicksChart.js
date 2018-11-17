import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  makeWidthFlexible
}from 'react-vis';

import React from 'react';

const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

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
          const buttonId = json.properties.button_id;
          const e = this.state.data.find((element) => {
            return element.y === buttonId;
          });
          if(e === undefined) {
            // create data
            // color:getColor(this.state.data.length + 1)
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
    const finalData = this.props.clickData ? this.props.clickData : this.state.data;
    // console.log(finalData);
    return (
      <div>
      {this.props.width ? 
        <XYPlot width={this.props.width} yType={'ordinal'} height={400} margin={{left: 180}}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title={this.props.title}/>
          <YAxis />
          <HorizontalBarSeries colorType='literal' animation='gentle' data={finalData} />
        </XYPlot>
        : <FlexibleXYPlot yType={'ordinal'} height={400} margin={{left: 200}}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title={this.props.title}/>
            <YAxis />
            <HorizontalBarSeries colorType='literal' animation='gentle' data={finalData} />
          </FlexibleXYPlot>
      }
      </div>

    );
  }
}
