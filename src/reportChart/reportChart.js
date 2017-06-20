import React, { Component } from 'react';
import Chart from 'chart.js';

// based on https://github.com/houjiazong/react-chartjs2/blob/master/src/index.js
class ReportChart extends Component {
  componentDidMount() {
    const ctx = this.refs['canvas'].getContext('2d');

    this.chart = new Chart(ctx, {
        type: this.props.type,
        data: this.props.data,
        options: this.props.options,
    });
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.type;
    delete props.data;
    delete props.options;
    return (
        <canvas ref="canvas" {...props}></canvas>
    );
  }
}

ReportChart.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)',
};

export default ReportChart;