import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import './../node_modules/codemirror/lib/codemirror.css';
import './../node_modules/codemirror/theme/material.css';
import './../node_modules/codemirror/mode/javascript/javascript';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: '',
      correctResponse: ''
    }
  }

  updateUserCode = (newCode) => {
    this.setState({
      userCode: newCode.getValue()
    });
  }

  getUserAnswer = (event) => {
    event.preventDefault();
    let correctResponse;
    try {
      correctResponse = this.checkUserAnswer();
    }
    catch(err) {
      correctResponse = 'Sorry that is incorrect, please try again.'
    }
    finally {
      this.setState({
        correctResponse: correctResponse,
      });
    }
  }

  checkUserAnswer() {
    let fnStr = this.state.userCode
      .split('function solveProblem(arg) {')[1]
      .split(`}
  
  var result = solveProblem(inputData);`)[0].trim();
    let evalCode = new Function('arg', fnStr);
    let resultStr = evalCode(this.props.input).toString();
    let answerStr = this.props.correctAnswer.toString();
    if (resultStr === answerStr) {
      return this.props.questionCount + 1 === this.props.gameLength ?
        'Correct, you completed all the problems! Click New Game.' :
        'Correct! Click Next Problem to continue to the next problem.'
    } else {
      return 'Sorry that is incorrect, please try again.'
    }
  }

  render() {
    let { renderInput, incrementStep, currentStep, questionCount, gameLength } = this.props;
    let problemSetup = `  var inputData = ${renderInput};
      
  function solveProblem(arg) {
    // Apply the prototype to your input here
    // Remember to return the result.
  }
  
  var result = solveProblem(inputData);`;
    return (
      <div className='step-containers' id='step-3-container'>
        <div>
          <h3>Step 3: Let's Solve The Problem</h3>
          <p>Here's the setup:</p>
          <CodeMirror 
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
              lineWrapping: true
            }}
            value={problemSetup}
            className='code-editor'
            onChange={this.updateUserCode} 
          />
          {
            currentStep === 3 && <h4>{this.state.correctResponse}</h4>
          }
        </div>
        {
          currentStep === 3 && (
            this.state.correctResponse.length > 42 ?
            <button id='next-step-button-3' onClick={incrementStep}>
              {
                questionCount + 1 === gameLength ? 'New Game' : 'Next Problem'
              }
            </button> :
            <button id='check-answer-button-3' onClick={this.getUserAnswer}>Check Answer</button>
          )
        }
      </div>
    )
  }
}

export default Step3;