import React, { Component } from 'react';
import ReportChart from './reportChart.js'

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
    reportDates.map(date => Math.floor(date / (60*60*1000)) * (60*60*1000))
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
            borderColor: seriesColors[i].replace('rgb', 'rgba').replace(')', ', 0.5)'),
        }))
      }
    });

    this.setState({
      options: {
        responsive: true,
        title: { display: true, fontSize: 20, text: title },
        tooltips: { mode: 'index', intersect: false, callbacks: {
        } },
        legends: { fontSize: 14 },
        hover: { mode: 'nearest', intersect: true },
        elements: { line: { tension: 0.2 } }, // bezier curve curviness
        scales: {
            xAxes: [{ type: 'time', time: { unit: 'hour', unitStepSize: 1, /* min: new Date(Date.now() - 24*60*60*1000), max: new Date(), */ tooltipFormat: 'HH:mm', displayFormats: { hour: 'HH:mm' } }, display: true, scaleLabel: { display: true, labelString: 'שעה' } }],
            yAxes: [{ display: true, ticks: { beginAtZero: true }, scaleLabel: { display: true, labelString: 'כמות הדיווחים' } }],
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