import React, {Component} from 'react';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerInput: '',
      correctAnswer: ''
    }
  }

  getAnswerInput = (event) => {
    this.setState({
      answerInput: event.target.value,
      correctAnswer: ''
    });
  }

  checkAnswer = (event) => {
    event.preventDefault();
    let correctAnswer = this.state.answerInput.toLowerCase() === this.props.correctMethod.toLowerCase() ? 
      'Correct! Click Next Step to continue.' : 
      'Sorry that is incorrect, please try again.';
    this.setState({
      correctAnswer: correctAnswer
    });
  }

  render() {
    let { currentStep, incrementStep } = this.props;

    return (
      <div className='step-containers'>
        <div>
          <h3>Step 2: Pick Your Method</h3>
          <p>Which prototype method is best to use for this problem (ex. sort)?</p>
          <label>Answer:
          <input onChange={this.getAnswerInput}></input>
          </label>
          {
            currentStep === 2 && <h4>{this.state.correctAnswer}</h4>
          }
        </div>
        {
          currentStep === 2 && (
            this.state.correctAnswer === 'Correct! Click Next Step to continue.' ? 
              <button onClick={incrementStep}>Next Step</button> :
              <button onClick={this.checkAnswer}>Check Answer</button>
            )
        }
      </div>
    )
  }
}

export default Step2;