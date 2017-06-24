import React, { Component } from 'react';

import GameOfLifeContainer from './components/GameOfLife';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <GameOfLifeContainer />
      </div>
    );
  }
}

export default App;
