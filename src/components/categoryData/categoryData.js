import React, { Component } from 'react';

import './categoryData.css';

class CategoryData extends Component {
  constructor(props, context){
      super(props, context);

      this.state = {
          
      };
  }

  componentDidMount(){

  }


  render() {
    return (
        <div className="category-page">
            <div className="category-page-content">
                <div className="title category-page-title">מציג מדדים עבור: {this.context.router.params.category}</div>

                <div className="charts-container"></div>
            </div>
        </div>
    );
  }

  static contextTypes = {
      router: React.PropTypes.func.isRequired
    }
}

export default CategoryData;