import React, { Component } from 'react';

import './category.css';

class Category extends Component {
  constructor(props, context){
      super(props, context);
  }
  
  render() {
    return (
        <div className="category-wrap">
            <div className="category-content">
                <span>{this.props.name}</span>
            </div>
      </div>
    );
  }
}

export default Category;