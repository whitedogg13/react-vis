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
} from 'index'; // this should be 'react-vis' for a real app

console.log( VerticalRectSeries);

function getData() {
    return {
        "chart": {
            "type": "block"
        },
        "title": {
            "text": "E30+3ST"
        },
        "subtitle": {
            "text": "訓練說明"
        },
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
                "yStart": 59,
                "yEnd": 74,
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
    }
};

/**
 * xType = "ordinal" => such as its 'A', 'B', 'C'
 */
class Study extends Component {
    render() {
        let chartInfo = getData();
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

        return (
            <div>
                <XYPlot
                    width={300}
                    height={300}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalRectSeries 
                        stroke="red"
                        data={rectData}
                    />                    
                    <LineSeries
                        data={lineData}
                    />
                </XYPlot>
            </div>
        );
    }
}

export default Study;