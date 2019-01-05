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
      correctResponse: '',
    }
  }

  updateUserCode = (newCode) => {
    this.setState({
      userCode: newCode.getValue()
    });
  }

  getUserAnswer = (event) => {
    event.preventDefault();
    let fnStr = this.state.userCode
      .split('function solveProblem(arg) {')[1]
      .split(`}
  
  var result = solveProblem(inputData);`)[0].trim();
    let evalCode = new Function('arg', fnStr);
    let resultStr = evalCode(this.props.input)
    if (resultStr) {
      resultStr.toString();
    }
    let answerStr = this.props.correctAnswer.toString();
    let correctResponse = resultStr === answerStr ?
      'Correct! Click Next Step to continue to the next problem.' :
      'Sorry that is incorrect, please try again.';
    this.setState({
      correctResponse: correctResponse,
    });
  }

  render() {
    let { input, incrementStep, currentStep } = this.props;
    let problemSetup = `  var inputData = ${JSON.stringify(input)};
      
  function solveProblem(arg) {
    // Apply the prototype to your input here
    // Remember to return the result.
  }
  
  var result = solveProblem(inputData);`;
    return (
      <div className='step-containers'>
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
          <p id='console'></p>
          {
            currentStep === 3 && <h4>{this.state.correctResponse}</h4>
          }
        </div>
        {
          this.props.currentStep === 3 && (
            this.state.correctResponse === 'Correct! Click Next Step to continue to the next problem.' ?
            <button onClick={incrementStep}>Next Step</button> :
            <button onClick={this.getUserAnswer}>Check Answer</button>
          )
        }
      </div>
    )
  }
}

export default Step3;