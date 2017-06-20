import React, { Component } from 'react';
import AppBar from './appBar/appBarComponent';
import Categories from './categoriesList/categoriesList';


import './App.css';

class App extends Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <div className="App">
        <AppBar/>
        {this.props.children}
        {/*<Categories/>*/}
      </div>
    );
  }
}

export default App;
