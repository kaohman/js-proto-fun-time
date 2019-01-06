import React from 'react';
import ReactDOM from 'react-dom';
import Step3 from '../Step3';
import { shallow } from 'enzyme';

let incrementStepMock = jest.fn();
let correctAnswerMock = 3;
let inputMock = [1, 2, 3];
let questionCountMock = 5;
let gameLengthMock = 31;
let currentStepMock = 3;
let newCodeMock = `function solveProblem(arg) { return 3 }
  
  var result = solveProblem(inputData);`;
let eventMock = { preventDefault: () => { } };

describe('Step3', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Step3 
        incrementStep={incrementStepMock}
        correctAnswer={correctAnswerMock}
        input={inputMock}
        questionCount={questionCountMock}
        gameLength={gameLengthMock}
        currentStep={currentStepMock}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({ 
      userCode: '',
      correctResponse: ''
     });
  });

  it('should get answer input as the user types in the code editor', () => {
    expect(wrapper.state('userCode')).toEqual('');
    wrapper.find('.code-editor').simulate('change', { getValue: () => { return newCodeMock } });
    expect(wrapper.state('userCode')).toEqual(`function solveProblem(arg) { return 3 }
  
  var result = solveProblem(inputData);`);
  });

  it('should be able to tell the user if their answer is correct', () => {
    wrapper.setState({ userCode: newCodeMock });
    wrapper.find('#check-answer-button-3').simulate('click', eventMock);
    expect(wrapper.state('correctResponse')).toEqual('Correct! Click Next Problem to continue to the next problem.');
  });
  
  it('should be able to tell the user if their answer is incorrect', () => {
    wrapper.setState({
      userCode: `function solveProblem(arg) { return 1 }
  
  var result = solveProblem(inputData);`});
    wrapper.find('#check-answer-button-3').simulate('click', eventMock);
    expect(wrapper.state('correctResponse')).toEqual('Sorry that is incorrect, please try again.');
  });

  it('should allow the user to click the Next Problem button if their answer was correct', () => {
    wrapper.setState({ correctResponse: 'Correct! Click Next Problem to continue to the next problem.' });
    wrapper.find('#next-step-button-3').simulate('click');
    expect(incrementStepMock).toBeCalled();
  });  

  it('should allow the user to click the New Game button if their answer was correct and they have completed the final problem', () => {
    wrapper.setState({ correctResponse: 'Correct, you completed all the problems! Click New Game.'});
    wrapper.find('#next-step-button-3').simulate('click');
    expect(incrementStepMock).toBeCalled();
  });  
  
});