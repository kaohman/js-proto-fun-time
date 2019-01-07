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
      showInstructions: false,
      problems: [],
      solvedProblemIds: [],
      unsolvedProblemIds: [],
      loaded: false
    }
  }

  toggleInstructionsCard = () => {
    this.setState({
      showInstructions: !this.state.showInstructions
    });
  }

  incrementStep = () => {
    let newStep = this.state.step < 3 ? this.state.step + 1 : 1;
    this.setState({
      step: newStep
    });
    if (newStep === 1) {
      this.state.solvedProblemIds.length !== this.state.problems.length ? this.updateQuestion() : this.updateGame();
    } 
  }

  updateQuestion = (skip = false) => {
    let newUnsolvedProblems = this.state.unsolvedProblemIds.slice();
    if (skip) {
      newUnsolvedProblems.push(newUnsolvedProblems.shift());
      this.setState({
        unsolvedProblemIds: newUnsolvedProblems,
        step: 1
      })
    } else {
      let newSolvedProblems = this.state.solvedProblemIds.slice();
      newUnsolvedProblems.shift();
      newSolvedProblems.push(newUnsolvedProblems[0]);
      this.setState({ 
        solvedProblemIds: newSolvedProblems,
        unsolvedProblemIds: newUnsolvedProblems,
        step: 1
      })
      localStorage.setItem('solvedProblems', JSON.stringify(newSolvedProblems));
    }
  }

  updateGame = () => {
    let newRandomProblems = this.state.problems.sort((a, b) => 0.5 - Math.random());
    let unsolvedProblems = newRandomProblems.map(question => question.question);
    this.setState({
      problems: newRandomProblems,
      unsolvedProblemIds: unsolvedProblems,
      solvedProblemIds: [],
      step: 1
    });
    localStorage.clear('solvedProblems');
  }

  skipProblem = (event) => {
    event.preventDefault();
    this.updateQuestion(true);
  }

  pullFromLocalStorage = () => {
    if (localStorage.hasOwnProperty('solvedProblems')) {
      let cachedSolvedProblemsIds = localStorage.getItem('solvedProblems');
      let solvedProblemIds = JSON.parse(cachedSolvedProblemsIds);
      let unsolvedProblemIds = this.state.unsolvedProblemIds.filter(id => solvedProblemIds.includes(id) === -1);
      this.setState({
        solvedProblemIds: solvedProblemIds,
        unsolvedProblemIds: unsolvedProblemIds
      });
    }
  }

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/problems')
      .then(data => data.json())
      .then(results => {
        let randomResults = results.problems.sort((a, b) => 0.5 - Math.random());
        let unsolvedProblems = randomResults.map(problem => problem.question);
        this.setState({
          problems: randomResults,
          totalProblems: randomResults.length,
          unsolvedProblemIds: unsolvedProblems,
          loaded: true
        });
      })
      .catch(error => console.log(error));

    this.pullFromLocalStorage();
  }

  render() {
    if (this.state.loaded === true) {
      let { step, showInstructions, problems, solvedProblemIds, unsolvedProblemIds } = this.state;
      let currentProblem = problems.find(problem => problem.question.includes(unsolvedProblemIds[0]));
      let parsedQuestion = currentProblem.question.replace('. ', '.\n\n');
      return (
        <div>
          <header>
            <div className='left-info-container'>
              <h2>
                {solvedProblemIds.length} of {problems.length} problems solved
                <span id='difficulty-text'>Current problem difficulty: {currentProblem.difficulty}</span>
              </h2>
              <button onClick={this.skipProblem} className='app-buttons' id='skip-button'>Skip Problem</button>
            </div>
            <h1>[ jsProtoFunTime ]</h1>
            <div className='right-header-buttons'>
              <button onClick={this.toggleInstructionsCard} className='app-buttons' id='instructions-button'>
              {
                showInstructions ? 'Hide Instructions' : 'Show Instructions'
              }
              </button>
              <button onClick={this.updateGame} className='app-buttons' id='restart-button'>Start New Game</button>
            </div>
          </header>
          <div className='game-container'>
            <Step1 incrementStep={this.incrementStep} question={parsedQuestion} currentStep={step} />
            {
              step > 1 && 
              <Step2 
                incrementStep={this.incrementStep}
                correctMethod={currentProblem.method}
                currentStep={step}
              />
            }
            {
              step > 2 && 
              <Step3 
                incrementStep={this.incrementStep} 
                correctAnswer={currentProblem.result}
                input={currentProblem.input}
                questionCount={solvedProblemIds.length}
                gameLength={problems.length}
                currentStep={step}
              />
            }
          </div>
          {
            showInstructions && <Instructions />
          }
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default App;
