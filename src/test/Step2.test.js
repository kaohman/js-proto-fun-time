import React from 'react';
import ReactDOM from 'react-dom';
import Step2 from '../Step2';
import { shallow } from 'enzyme';

const incrementStepMock = jest.fn();
const correctMethodMock = 'map';
const currentStepMock = 2;
const changeEventMock = { target: { value: 'map'} };
const clickEventMock = { preventDefault: () => { } };

describe('Step2', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Step2 
        incrementStep={incrementStepMock}
        correctMethod={correctMethodMock}
        currentStep={currentStepMock}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({ 
      answerInput: '',
      correctAnswer: ''
     });
  });

  it('should get answer input as the user types in the input box', () => {
    expect(wrapper.state('answerInput')).toEqual('');
    wrapper.find('input').simulate('change', changeEventMock);
    expect(wrapper.state('answerInput')).toEqual('map');
  });

  it('should check the user answer against the correct answer when the user clicks a button and tell the user if the answer is correct', () => {
    expect(wrapper.state('correctAnswer')).toEqual('');
    wrapper.find('input').simulate('change', changeEventMock);
    wrapper.find('#check-answer-button-2').simulate('click', clickEventMock);
    expect(wrapper.state('correctAnswer')).toEqual('Correct! Click Next Step to continue.');
  });

  it('should tell the user if the answer is incorrect', () => {
    expect(wrapper.state('correctAnswer')).toEqual('');
    wrapper.setState({ answerInput: 'forEach' });
    wrapper.find('#check-answer-button-2').simulate('click', clickEventMock);
    expect(wrapper.state('correctAnswer')).toEqual('Sorry that is incorrect, please try again.');
  });

  it('should allow the user to click the Next Step button if their answer was correct', () => {
    wrapper.setState({ correctAnswer: 'Correct! Click Next Step to continue.' });
    wrapper.find('#next-step-button-2').simulate('click');
    expect(incrementStepMock).toBeCalled();
  });  

});