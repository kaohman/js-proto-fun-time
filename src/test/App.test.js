import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';

let currentProblemMock = {
  question: 'You are given the following array of numbers: [1, 3, 5, 6, 7, 9]. You are only interested in numbers that are divisible by 3. Return a new array or numbers that contains only the numbers divisible by 3.',
  inputDataType: 'array',
  outputDataType: 'array',
  method: 'filter',
  input: [1,3,5,6,7,9],
  result: [3,6,9],
  difficulty: 2
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    );

    wrapper.setState({
      step: 3,
      questionCount: 0,
      showInstructions: false,
      problems: [],
      totalProblems: 0,
      currentProblem: currentProblemMock,
      loaded: true
    });
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({ 
      step: 3,
      questionCount: 0,
      showInstructions: false,
      problems: [],
      totalProblems: 0,
      currentProblem: currentProblemMock,
      loaded: true
     });
  });

  it('should toggle showInstructions in state when toggleInstructionsCard if called', () => {
    expect(wrapper.state('showInstructions')).toEqual(false);
    wrapper.find('#instructions-button').simulate('click');
    expect(wrapper.state('showInstructions')).toEqual(true);
  });

  it('should increment the step in state when incrementStep is called', () => {
    wrapper.instance().incrementStep();
    expect(wrapper.state('nextStep')).toEqual(2);
    wrapper.instance().incrementStep();
    expect(wrapper.state('nextStep')).toEqual(3);
    wrapper.instance().incrementStep();
    expect(wrapper.state('nextStep')).toEqual(1);
  });

  it('should call the updateQuestion method if the current step is 3', () => {
    wrapper.instance().incrementStep();
    wrapper.instance().incrementStep();
    wrapper.instance().incrementStep();
    expect(updateQuestion()).toBeCalled();
  });

  it('should update the questionCount and currentProblem in state when updateQuestion is called', () => {

  });

  it('should call the updateGame method if the current step is 3 and the user is on the final question', () => {

  });

  it('should update the questionCount, problems, and currentProblem in state when updateGame is called', () => {

  });

});