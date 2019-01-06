import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';

const problemsMock = [{
  question: "You are given the following array of numbers: [1, 3, 5, 6, 7, 9]. You are only interested in numbers that are divisible by 3. Return a new array or numbers that contains only the numbers divisible by 3.",
  inputDataType: "array",
  outputDataType: "array",
  method: "filter",
  input: [1, 3, 5, 6, 7, 9],
  result: [3, 6, 9],
  difficulty: 2
  },
  {
    question: "You are given the following array of words to use in Scrabble: ['dog', 'fright', 'silly', 'chair', 'kittens', 'pizza']. You only want to use a few of your letters though so you would like to filter out the longer words. Return a new array of only words with fewer than 5 letters.",
    inputDataType: "array",
    outputDataType: "array",
    method: "filter",
    input: ["dog", "fright", "silly", "chair", "kittens", "pizza"],
    result: ["dog", "silly", "chair", "pizza"],
    difficulty: 3
  },
  {
    question: "You are given the following array of numbers: [-1, 8, 3, -5, 2, 9]. You don't only like positive numbers so you want to filter out all the negativity. Return a new array with only positive numbers.",
    inputDataType: "array",
    outputDataType: "array",
    method: "filter",
    input: [-1, 8, 3, -5, 2, 9],
    result: [8, 3, 2, 9],
    difficulty: 2
  }
];

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
      step: 1,
      questionCount: 0,
      showInstructions: false,
      problems: problemsMock,
      totalProblems: 0,
      currentProblem: problemsMock[0],
      loaded: true
    });
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({ 
      step: 1,
      questionCount: 0,
      showInstructions: false,
      problems: problemsMock,
      totalProblems: 0,
      currentProblem: problemsMock[0],
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
    expect(wrapper.state('step')).toEqual(2);
    wrapper.instance().incrementStep();
    expect(wrapper.state('step')).toEqual(3);
    wrapper.instance().incrementStep();
    expect(wrapper.state('step')).toEqual(1);
  });

  it('should update the questionCount and currentProblem in state when updateQuestion is called', () => {
    expect(wrapper.state('questionCount')).toEqual(0);
    expect(wrapper.state('currentProblem')).toEqual(problemsMock[0]);
    wrapper.instance().updateQuestion();
    expect(wrapper.state('questionCount')).toEqual(1);
    expect(wrapper.state('currentProblem')).toEqual(problemsMock[1]);
  });

  it('should update the questionCount, problems, and currentProblem in state when updateGame is called', () => {
    wrapper.setState( { step: 3, questionCount: 3 } );
    wrapper.instance().updateGame();
    expect(wrapper.state('questionCount')).toEqual(0);
    expect(wrapper.state('problems').length).toEqual(3);
  });

});