import React, { Component } from 'react';
import AppBar from './appBar/appBarComponent';
import Categories from './categoriesList/categoriesList';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar/>
        <Categories/>
      </div>
    );
  }
}

export default App;
