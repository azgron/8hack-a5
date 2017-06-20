import React, { Component } from 'react';
import ReportChart from '../reportChart/reportChart.js'

function* groupCounts(arr) {
  let start = true;
  let prev = undefined;
  let count = 0;
  for (let value of arr) {
    if (start || value === prev) {
      count++;
    } else {
      yield { value: prev, count };
      count = 1;
    }
    start = false;
    prev = value;
  }
  if (count >= 0) {
    yield { value: prev, count };
  }
}

function reportDatesToDataset(reportDates) {
  return Array.from(groupCounts(
    // round all reports by half hour intervals
    reportDates.map(date => Math.floor(date / (30*60*1000)) * (30*60*1000))
  ))
  // create a dataset of rounded dates to count
  .map(({ value, count }) => ({ x: new Date(value), y: count }));
}

class AnswersTimelineChart extends Component {
  /// title = String
  /// answers = String[]
  /// reportDates = Number[][] (unix date)

  constructor() {
      super();
      this.state = { data: {}, options: {} };
  }

  componentDidMount() {
    this.initDataset(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.initDataset(nextProps);
  }

  initDataset({ title, answers, reportDates }) {
    const seriesColors = [
      ReportChart.chartColors.blue,
      ReportChart.chartColors.red,
      ReportChart.chartColors.purple
    ];

    this.setState({
      data: {
        datasets: answers.map((answer, i) => ({
            label: answer,
            data: reportDatesToDataset(reportDates[i]),
            fill: false,
            backgroundColor: seriesColors[i],
            borderColor: seriesColors[i],
        }))
      }
    });

    this.setState({
      options: {
        responsive: true,
        title: { display: true, text: title },
        tooltips: { mode: 'index', intersect: false, callbacks: {
            title(arr, data) {
              const date = arr[0].xLabel;
              return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
            }
        } },
        hover: { mode: 'nearest', intersect: true },
        elements: { line: { tension: 0.2 } }, // bezier curve curviness
        scales: {
            xAxes: [{ type: 'time', time: { unit: 'hour', displayFormats: { hour: 'HH:mm' } }, display: true, scaleLabel: { display: true, labelString: 'שעה' } }],
            yAxes: [{ display: true, scaleLabel: { display: true, labelString: 'כמות הדיווחים' } }],
        },
      }
    });
  }

  render() {
    return (
      <ReportChart type="line" data={this.state.data} options={this.state.options}></ReportChart>
    );
  }
}

export default AnswersTimelineChart;