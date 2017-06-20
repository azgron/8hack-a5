import React, { Component } from 'react';
import ReportChart from '../reportChart/reportChart.js'

function* groupCounts(arr) {
  let prev = NaN; // to never be equal to something at first
  let count = 0;
  for (let value of arr) {
    if (value === prev) {
      count++;
    } else {
      yield { value, count };
      count = 0;
      prev = value;
    }
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
  constructor() {
      super();
      this.state = { data: {}, options: {} };
  }

  componentWillMount() {
    const seriesColors = [
      ReportChart.chartColors.blue,
      ReportChart.chartColors.red,
      ReportChart.chartColors.purple
    ];

    this.setState({
      data: {
        datasets: this.props.answers.map((answer, i) => ({
            label: answer,
            data: reportDatesToDataset(this.props.reportDates[i]),
            fill: false,
            backgroundColor: seriesColors[i],
            borderColor: seriesColors[i],
        }))
      }
    });

    this.setState({
        options: {
        responsive: true,
        title: { display: true, text: this.props.title },
        tooltips: { mode: 'index', intersect: false, callbacks: {
            /*beforeLabel(arr, data) {
            var i = arr.index;
            var data1 = data.datasets[arr.datasetIndex];
            return data1.data[i] + ": ";
            },
            label(arr, data) {
            return data.labels[arr.index];
            }*/
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