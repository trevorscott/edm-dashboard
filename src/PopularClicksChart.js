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
  LabelSeries,
  makeWidthFlexible
}from 'react-vis';

import React, { Component } from 'react';
import { API_ROOT } from './api-config';

const FlexibleXYPlot = makeWidthFlexible(XYPlot); 

const colors = 
[
  "#3F2E40",
  "#45364A",
  "#4C3E55",
  "#514761",
  "#56516C",
  "#5A5A78",
  "#5D6483",
  "#606F8F",
  "#61799A",
  "#6284A5",
  "#628FB0",
  "#629ABA",
  "#61A6C4",
  "#5FB1CE",
  "#5CBDD7",
  "#59C9DF",
  "#57D5E6",
  "#57D5E6"
]

const colors2 = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#125C77',
  '#4DC19C',
  '#776E57',
  '#12939A',
  '#17B8BE',
  '#F6D18A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#829AE3',
  '#E79FD5',
  '#1E96BE',
  '#89DAC1',
  '#B3AD9E'
]

const colors3 = [
"#EDE7F6",
"#D1C4E9",
"#B39DDB",
"#9575CD",
"#7E57C2",
"#673AB7",
"#5E35B1",
"#512DA8",
"#4527A0",
"#311B92",
"#B388FF",
"#7C4DFF",
"#651FFF",
"#6200EA"
]

function getColor(index) {
  return colors3[index];
}

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
            this.setState({
              data:this.state.data.concat({x: 1, y: json.properties.button_id, color:getColor(this.state.data.length + 1)})
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
    return (
      <div>
        <FlexibleXYPlot yType={'ordinal'} height={400} margin={{left: 200}}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
        <HorizontalBarSeries colorType='literal' animation='gentle' data={this.state.data} />
      </FlexibleXYPlot>
      </div>
    );
  }
}
