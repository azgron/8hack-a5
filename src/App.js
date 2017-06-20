import React, { Component } from 'react';
import logo from './logo.svg';
import AnswersTimelineChart from './answersTimelineChart/answersTimelineChart.js'
import firebase from 'firebase';
import './App.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA6TjtSW85v3_YMX7VFUwcw064aj-meVDU",
  authDomain: "boiling-torch-1957.firebaseapp.com",
  databaseURL: "https://boiling-torch-1957.firebaseio.com",
  storageBucket: "gs://boiling-torch-1957.appspot.com",
  messagingSenderId: "865900344487"
};
firebase.initializeApp(config);

const title = 'הסעות לאוניברסיטה';
const answers = ['חיכו מעל שעה', 'חיכו מעל חצי-שעה', 'זניח'];

class App extends Component {
  constructor() {
    super();
    this.state = { dataA: [], dataB: [], dataC: [] };
    this.tomChild = this.getRef().child('categories');
  }

  getRef() {
    return firebase.database().ref();
  }

  componentDidMount() {
    this.tomChild.child('A').on('value', snapshot => {
      this.setState({ dataA: Object.values(snapshot.val()) });
    });
    this.tomChild.child('B').on('value', snapshot => {
      this.setState({ dataB: Object.values(snapshot.val()) });
    });
    this.tomChild.child('C').on('value', snapshot => {
      this.setState({ dataC: Object.values(snapshot.val()) });
    });
  }

  render() {
    const randomReportDates = [this.state.dataA, this.state.dataB, this.state.dataC];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React </h2>
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
