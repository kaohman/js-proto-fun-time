import React, { Component } from 'react';
import './App.css';
import './styles/normalize.css';
import './styles/main.scss';
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
import Instructions from './Instructions.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      question: 1,
      showInstructions: false,
      problems: [],
      currentProblemIndex: 0,
      currentProblem: {}
    }
  }

  toggleInstructionsCard = () => {
    this.setState({
      showInstructions: !this.state.showInstructions,
      problems: []
    });
  }

  incrementStep = () => {
    let newStep = this.state.step < 3 ? this.state.step + 1 : 1
    this.setState({
      step: newStep
    });
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/problems')
      .then(data => data.json())
      .then(results => {
        this.setState({
          problems: results.problems,
          currentProblem: results.problems[this.state.currentProblemIndex]
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    let { step, question, showInstructions, currentProblem } = this.state;
    return (
      <div>
        <header>
          <h2>Question 1 of {question}</h2>
          <h1>[ jsProtoFunTime ]</h1>
          <button onClick={this.toggleInstructionsCard} id="instructions-button">
          {
            showInstructions ? 'Hide Instructions' : 'Show Instructions'
          }
          </button>
        </header>
        <div className='game-container'>
          <Step1 incrementStep={this.incrementStep} question={currentProblem.question} currentStep={step}/>
          {
            step > 1 && <Step2 incrementStep={this.incrementStep} correctMethod={currentProblem.method} currentStep={step}/>
          }
          {
            step > 2 && <Step3 incrementStep={this.incrementStep} correctAnswer={currentProblem.answer} currentStep={step}/>
          }
        </div>
        {
          showInstructions && <Instructions />
        }
      </div>
    );
  }
}

export default App;
