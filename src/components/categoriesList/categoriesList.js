import React, { Component } from 'react';
import Category from './category/category';
import * as firebase from 'firebase';


import './categoriesList.css';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA6TjtSW85v3_YMX7VFUwcw064aj-meVDU",
  authDomain: "boiling-torch-1957.firebaseapp.com",
  databaseURL: "https://boiling-torch-1957.firebaseio.com",
  storageBucket: "gs://boiling-torch-1957.appspot.com",
  messagingSenderId: "865900344487"
};
firebase.initializeApp(config);

class CategoriesList extends Component {
  constructor(props, context){
      super(props, context);

      this.state = {
          categories: [
              'הסעות',
              'חד"א',
              'חניה',
              'טרמפיאדה',
              'מרוגים',
              'ניקיון',
              'מחשוב',
              'אחר'
          ]
      };

    //   this.tomChild = this.getRef().child("tom");
  }

  componentDidMount(){
    //   this.getCategories()
    //   .then(categories => {
    //       this.setState({ categories });
    //   });
    
//     this.tomChild.on('value', snapshot => {
//             this.setState({data: snapshot.val()});
//         });
  }
  
//   getCategories = () => {
//       return Promise.resolve({});
//   };

//   getRef() {
//         return firebase.database().ref();
//     }

  render() {
    return (
        <div className="categories-list-wrap">
          <div className="title">במה תרצה להתמקד?</div>
            <div className="list-content">            
                {this.state.categories.map(category => <Category key={category} name={category}/>)}
            </div>
        </div>
    );
  }
}

export default CategoriesList;