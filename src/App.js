import React, { Component } from 'react';
import Board from './containers/Board/Board';
import Aux from './hoc/Aux';

import './App.css'


class App extends Component {
  
  componentWillMount () {

  }
  render() {
    
    return (
      
      <Aux>
      <Board />
      </Aux>
    );
  }
}

export default App;
