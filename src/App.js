import React, { Component } from 'react';
import logo from './logo.svg';
import ReportChart from './reportChart/reportChart.js'
import './App.css';

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

const random = (n=100) => Math.round(Math.random() * n);
const numSort = (a,b) => a-b;
const chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)',
};
const seriesColors = [chartColors.blue, chartColors.red, chartColors.purple];

const title = 'הסעות לאוניברסיטה';
const answers = ['חיכו מעל חצי-שעה', 'חיכו מעל שעה', 'חיכו מעל שעה וחצי'];
const reportDates = answers.map(() => new Array(100).fill().map(() => random(1000*60*60*5)).sort(numSort));

const data = {
  datasets: answers.map((answer, i) => ({
    label: answer,
    data: reportDatesToDataset(reportDates[i]),
    fill: false,
    backgroundColor: seriesColors[i],
    borderColor: seriesColors[i],
  }))
};
const options = {
  responsive: true,
  title: { display: true, text: title },
  tooltips: { mode: 'index', intersect: false, callbacks: {
    /*beforeLabel(arr, data) {
      console.log(arr, data);
      var i = arr.index;
      var data1 = data.datasets[arr.datasetIndex];
      return data1.data[i] + ": ";
    },*/
    /*label(arr, data) {
        return data.labels[arr.index];
    }*/
  } },
  hover: { mode: 'nearest', intersect: true },
  elements: { line: { tension: 0.2 } }, // bezier curve curviness
  scales: {
      xAxes: [{ type: 'time', time: { unit: 'hour', displayFormats: { hour: 'HH:mm' } }, display: true, scaleLabel: { display: true, labelString: 'שעה' } }],
      yAxes: [{ display: true, scaleLabel: { display: true, labelString: 'כמות הדיווחים' } }],
  },
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ReportChart width="400" type="line" data={data} options={options}></ReportChart>
      </div>
    );
  }
}

export default App;
