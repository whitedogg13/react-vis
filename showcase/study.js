import React, {Component} from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  VerticalRectSeries,
  LineSeries,
  MarkSeries,
} from 'index'; // this should be 'react-vis' for a real app

const jsonData = {
    "chart": {
        "type": "block"
    },
    "title": {
        "text": "E30+3ST"
    },
    "subtitle": {
        "text": "訓練說明"
    },
    "xMin": 0,
    "xMax": 100,
    "yMin": 0,
    "yMax": 100,
    "yAxis": {
        "text": "HRR心率(%)",
        "tickInterval": 20
    },
    "xAxis": {
        "text": "時間(分鐘)",
        "tickInterval": 10
    },
    "series": {
        "data": [{
            "xStart": 0,
            "xEnd": 10,
            "yStart": 59,
            "yEnd": 74,
            "color": "#5555FF"
        }, {
            "xStart": 10,
            "xEnd": 20,
            "yStart": 25,
            "yEnd": 48,
            "color": "#5555FF"
        }, {
            "xStart": 20,
            "xEnd": 30,
            "yStart": 40,
            "yEnd": 50,
            "color": "#5555FF"
        }, {
            "xStart": 30,
            "xEnd": 40,
            "yStart": 60,
            "yEnd": 80,
            "color": "#5555FF"
        }, {
            "xStart": 40,
            "xEnd": 50,
            "yStart": 70,
            "yEnd": 90,
            "color": "#5555FF",
        }]
    }
};

class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: null
        }
    }

    render() {
        let chartInfo = jsonData;
        let rectData = chartInfo.series.data.map(
            cell => {
                return {
                    x0: cell.xStart,
                    x: cell.xEnd,
                    y0: cell.yStart,
                    y: cell.yEnd,
                }
            }
        );

        let lineData = chartInfo.series.data.map(
            cell => {
                return {
                    x: (cell.xStart + cell.xEnd) / 2,
                    y: (cell.yStart + cell.yEnd) / 2,
                }
            }
        );

        let {index} = this.state;

        return (
            <div>
                <XYPlot
                    xDomain={[chartInfo.xMin, chartInfo.xMax]}
                    yDomain={[chartInfo.yMin, chartInfo.yMax]}
                    width={300}
                    height={300}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />

                    <VerticalRectSeries 
                        stroke={index === "red"}
                        data={rectData}
                    />                    
                    <LineSeries
                        data={lineData}
                        onNearestX={this._onNearestX}
                    />

                    {
                        index !== null && (
                            <LineSeries
                                data={[
                                    {x: lineData[index].x, y: chartInfo.yMin},
                                    {x: lineData[index].x, y: chartInfo.yMax}
                                ]}
                            />
                        )
                    }

                    <MarkSeries
                      data={lineData}
                      onValueClick={
                          e => console.log(e)
                      }
                    />
                </XYPlot>
            </div>
        );
    }

    _onNearestX = (_, {index}) => {
        console.log(index);
        this.setState({index});
    }
}

export default Study;