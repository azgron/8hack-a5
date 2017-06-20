import React, { Component } from 'react';
import ReportChart from '../reportChart/reportChart.js'

class SurveyBarChart extends Component {
  /// title = String
  /// answers = String[]
  /// counters = Number[]

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

  initDataset({ title, answers, counters }) {
    const seriesColors = [
      ReportChart.chartColors.blue,
      ReportChart.chartColors.red,
      ReportChart.chartColors.purple
    ];

    this.setState({
      data: {
        labels: answers,
        datasets: [{
            label: '',
            data: counters,
            fill: false,
            backgroundColor: seriesColors.slice(0, counters.length).map(c => c.replace('rgb', 'rgba').replace(')', ', 0.2)')),
            borderColor: seriesColors.slice(0, counters.length),
            borderWidth: 2,
        }]
      }
    });

    this.setState({
      options: {
        responsive: true,
        title: { display: true, text: title },
        tooltips: { mode: 'index', intersect: false },
        hover: { mode: 'nearest', intersect: true },
        scales: {
            yAxes: [{ display: true, ticks: { beginAtZero: true, stepSize: 1 }, scaleLabel: { display: true, labelString: 'כמות הדיווחים' } }],
        },
      }
    });
  }

  render() {
    return (
      <ReportChart type="bar" data={this.state.data} options={this.state.options}></ReportChart>
    );
  }
}

export default SurveyBarChart;