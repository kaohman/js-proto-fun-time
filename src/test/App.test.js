import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';

let problemsMock = [{
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
let problemIdsMock = [1, 2, 3];
let eventMock = { preventDefault: () => { } };

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
      showInstructions: false,
      problems: problemsMock,
      solvedProblemIds: [],
      unsolvedProblemIds: problemIdsMock,
      loaded: true
    });
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({ 
      step: 1,
      showInstructions: false,
      problems: problemsMock,
      solvedProblemIds: [],
      unsolvedProblemIds: problemIdsMock,
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

  it('should update the solved and unsolved problems in state when updateQuestion is called after the user gets an answer correct', () => {
    expect(wrapper.state('unsolvedProblemIds')).toEqual([1,2,3]);
    expect(wrapper.state('solvedProblemIds')).toEqual([]);
    wrapper.instance().updateQuestion();
    expect(wrapper.state('unsolvedProblemIds')).toEqual([2,3]);
    expect(wrapper.state('solvedProblemIds')).toEqual([1]);
    expect(wrapper.state('step')).toEqual(1);
  });

  it('should allow users to skip a problem on click', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'updateQuestion');
    wrapper.find('#skip-button').simulate('click', eventMock);
    expect(instance.updateQuestion).toHaveBeenCalled();
    expect(wrapper.state('unsolvedProblemIds')).toEqual([2, 3, 1]);
  });

  it('should update the unsolved problems in state when updateQuestion is called after the user skips a problem', () => {
    expect(wrapper.state('unsolvedProblemIds')).toEqual([1,2,3]);
    wrapper.instance().updateQuestion(true);
    expect(wrapper.state('unsolvedProblemIds')).toEqual([2,3,1]);
    expect(wrapper.state('solvedProblemIds')).toEqual([]);
    expect(wrapper.state('step')).toEqual(1);
  });

  it('should allow users to start a new game on click', () => {
    wrapper.find('#restart-button').simulate('click');
    expect(wrapper.state('step')).toEqual(1);
    expect(wrapper.state('problems').length).toEqual(3);
    expect(wrapper.state('unsolvedProblemIds').length).toEqual(3);
    expect(wrapper.state('solvedProblemIds')).toEqual([]);
  });

  it('should update the problems, unsolvedProblemIds, and solvedProblems in state when updateGame is called', () => {
    wrapper.setState( { step: 3, solvedProblemIds: [1,2,3] } );
    wrapper.instance().updateGame();
    expect(wrapper.state('step')).toEqual(1);
    expect(wrapper.state('problems').length).toEqual(3);
    expect(wrapper.state('unsolvedProblemIds').length).toEqual(3);
    expect(wrapper.state('solvedProblemIds')).toEqual([]);
  });

  it('should be able to pull solved problems from local storage', () => {
    localStorage.setItem('solvedProblems', JSON.stringify(problemIdsMock));
    wrapper.instance().pullFromLocalStorage();
    expect(wrapper.state('solvedProblemIds')).toEqual([1,2,3]);
  });

  it('should be able parse data input text', () => {
    expect(wrapper.instance().getParsedInput([1, 3, 5, 6, 7, 9])).toEqual("[1,3,5,6,7,9]");
  });
});