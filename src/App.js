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
      step: 3,
      questionCount: 0,
      showInstructions: false,
      problems: [],
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
    let newStep = this.state.step < 3 ? this.state.step + 1 : 1;
    newStep === 1 && this.updateQuestion();
    this.setState({
      step: newStep
    });
  }

  updateQuestion = () => {
    let newQuestionCount = this.state.questionCount + 1;
    console.log(newQuestionCount)
    this.setState({
      questionCount: newQuestionCount,
      currentProblem: this.state.problems[newQuestionCount]
    });
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/problems')
      .then(data => data.json())
      .then(results => {
        let randomResults = results.problems.sort((a, b) => 0.5 - Math.random());
        this.setState({
          problems: randomResults,
          currentProblem: randomResults[0]
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    let { step, showInstructions, currentProblem, problems, questionCount } = this.state;
    return (
      <div>
        <header>
          <h2>
            Question {questionCount+1} of {problems.length}
            <span id='difficulty-text'>Difficulty: {currentProblem.difficulty}</span>
          </h2>
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
            step > 2 && 
            <Step3 
              incrementStep={this.incrementStep} 
              correctAnswer={currentProblem.result}
              input={currentProblem.input}
              currentStep={step}
            />
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
