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

export default ReportChart;