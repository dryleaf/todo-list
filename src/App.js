import React, { Component } from 'react';
import Tasks from './Tasks/Tasks';
import './App.css';

class App extends Component {
  render() {
    return (
      <section className="card-body">
        <Tasks/>
      </section>
    );
  }
}

export default App;
