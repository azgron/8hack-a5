import React, { Component } from 'react';
import AnswersTimelineChart from '../charts/answersTimelineChart.js'
import SurveyBarChart from '../charts/surveyBarChart.js'
import firebase from 'firebase';

import './categoryData.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA6TjtSW85v3_YMX7VFUwcw064aj-meVDU",
  authDomain: "boiling-torch-1957.firebaseapp.com",
  databaseURL: "https://boiling-torch-1957.firebaseio.com",
  storageBucket: "gs://boiling-torch-1957.appspot.com",
  messagingSenderId: "865900344487"
};
firebase.initializeApp(config);

class CategoryData extends Component {
  constructor(props, context){
      super(props, context);

      this.state = { dataA: [], dataB: [], dataC: [], dataD: [] };
      // connect to our online DB powered by firebase
      this.dbCategories = firebase.database().ref().child('categories');
  }

  componentDidMount() {
    // get data from our DB
    
    // 3 data streams for the answer timeline
    this.dbCategories.child('A').on('value', snapshot => {
      this.setState({ dataA: Object.values(snapshot.val()) });
    });
    this.dbCategories.child('B').on('value', snapshot => {
      this.setState({ dataB: Object.values(snapshot.val()) });
    });
    this.dbCategories.child('C').on('value', snapshot => {
      this.setState({ dataC: Object.values(snapshot.val()) });
    });
    // fake data based on perlin-noise for these graphs was
    // generated with https://github.com/josephg/noisejs and the following oneliner:
    //   noise.seed(Math.random()*65536);z=new Array(20).fill().map((_,i) => noise.perlin2(i*0.02*5,0));min=Math.min.apply(Math,z);max=Math.max.apply(Math,z);z=z.map(x => Math.round(20*(x-min)/(max-min)));z=z.map((x,i) => new Array(x).fill().map(_ => Date.now()-i*60*60*1000)).reduce((a,b)=>a.concat(b)).reverse().join(',');z

    // data for the bar graph
    this.dbCategories.child('D').on('value', snapshot => {
      this.setState({ dataD: Object.values(snapshot.val()) });
    });
  }


  render() {
    return (
        <div className="category-page">
            <div className="category-page-content">
                <div className="title category-page-title">מציג מדדים עבור: {this.context.router.params.category}</div>

                <div className="charts-container" style={{display: 'flex', height: 'auto', padding: '2%', boxSizing: 'border-box'}}>
                    <div style={{backgroundColor: 'white', padding: '1%', width: '50%', boxSizing: 'border-box'}}>
                        <AnswersTimelineChart
                        title="הסעות לאוניברסיטה"
                        answers={['חיכו מעל שעה','חיכו מעל חצי-שעה','זניח']}
                        reportDates={[this.state.dataA, this.state.dataB, this.state.dataC]}
                    />
                    </div>
                    <div style={{backgroundColor: 'white', padding: '1%', width: '50%', boxSizing: 'border-box'}}>
                        <SurveyBarChart
                        title="כמות הדיווחים האחרונים"
                        answers={['עומס כבד מאוד','האוטבוס לא עצר','ההסעה לא מגיעה']}
                        counters={this.state.dataD}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  static contextTypes = {
      router: React.PropTypes.func.isRequired
    }
}

export default CategoryData;