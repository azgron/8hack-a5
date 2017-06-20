import React, { Component } from 'react';

import './category.css';

class Category extends Component {
  constructor(props, context){
      super(props, context);
  }
  
  goToCategory = (categoryName) => {
      this.context.router.push('/' + categoryName);
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
  
  static contextTypes = {
      router: React.PropTypes.func.isRequired
    }
}

export default Category