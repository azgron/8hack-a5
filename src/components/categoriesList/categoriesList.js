import React, { Component } from 'react';
import Category from './category/category';


import './categoriesList.css';

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
  }

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