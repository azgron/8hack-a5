import React, { Component } from 'react';

import './appBar.css';

class AppBar extends Component {
  constructor(props, context){
      super(props, context);
  }
  
  render() {
    return (
        <div className="app-bar-wrap">
            <div className="app-title">הכל בסדר!</div>
      </div>
    );
  }
}

export default AppBar;
