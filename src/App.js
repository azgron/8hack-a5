import React, { Component } from 'react';
import logo from './logo.svg';
import ReportChart from './reportChart/reportChart.js'
import AnswersTimelineChart from './answersTimelineChart/answersTimelineChart.js'
import './App.css';

const random = (n=100) => Math.round(Math.random() * n);
const numSort = (a,b) => a-b;

const title = 'הסעות לאוניברסיטה';
const answers = ['חיכו מעל חצי-שעה', 'חיכו מעל שעה', 'חיכו מעל שעה וחצי'];
const randomReportDates = answers.map(() => new Array(100).fill().map(() => random(1000*60*60*5)).sort(numSort));

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
        <div style={{width: '50%'}}>
          <AnswersTimelineChart title={title} answers={answers} reportDates={randomReportDates}></AnswersTimelineChart>
        </div>
      </div>
    );
  }
}

export default App;
