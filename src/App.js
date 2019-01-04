import React, { Component } from 'react';
import './App.css';
import './styles/normalize.css';
import './styles/main.scss';
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 3,
      question: 1
    }
  }

  render() {
    let { step, question } = this.state;

    return (
      <div>
        <header>
          <h2>Question 1 of {question}</h2>
          <h1>[ jsProtoFunTime ]</h1>
          <button id="instructions-button">Instructions</button>
        </header>
        <div className='game-container'>
          <Step1 />
          {
            step > 1 && <Step2 />
          }
          {
            step > 2 && <Step3 />
          }
        </div>
      </div>
    );
  }
}

export default App;
