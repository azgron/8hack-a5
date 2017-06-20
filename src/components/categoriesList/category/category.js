import React, { Component } from 'react';

import './category.css';

class Category extends Component {
  constructor(props, context){
      super(props, context);
  }
  
  goToCategory = (categoryName) => {
      console.log(categoryName);
  };

  render() {
    return (
        <div className="category-wrap">
            <div className="category-content" onClick={() => this.goToCategory(this.props.name)}>
                <span className="text">{this.props.name}</span>
            </div>
      </div>
    );
  }
}

export default Category;