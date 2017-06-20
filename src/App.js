import React, { Component } from 'react';
import logo from './logo.svg';
import AnswersTimelineChart from './answersTimelineChart/answersTimelineChart.js'
import SurveyBarChart from './surveyBarChart/surveyBarChart.js'
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

class App extends Component {
  constructor() {
    super();
    this.state = { dataA: [], dataB: [], dataC: [] };
    this.dbCategories = firebase.database().ref().child('categories');
  }

  componentDidMount() {
    this.dbCategories.child('A').on('value', snapshot => {
      this.setState({ dataA: Object.values(snapshot.val()) });
    });
    this.dbCategories.child('B').on('value', snapshot => {
      this.setState({ dataB: Object.values(snapshot.val()) });
    });
    this.dbCategories.child('C').on('value', snapshot => {
      this.setState({ dataC: Object.values(snapshot.val()) });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React </h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{padding: '1%', width: '50%', boxSizing: 'border-box', float: 'left'}}>
          <AnswersTimelineChart
            title="הסעות לאוניברסיטה"
            answers={['חיכו מעל שעה','חיכו מעל חצי-שעה','זניח']}
            reportDates={[this.state.dataA, this.state.dataB, this.state.dataC]}></AnswersTimelineChart>
        </div>
        <div style={{padding: '1%', width: '50%', boxSizing: 'border-box', float: 'left'}}>
          <SurveyBarChart
            title="מידת הרצון ממערך ההסעות"
            answers={['לא מרוצה','מרוצה','מאוד מרוצה']}
            counters={[6,8,3]}></SurveyBarChart>
        </div>
      </div>
    );
  }
}

export default App;
