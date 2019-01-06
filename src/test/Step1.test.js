import React from 'react';
import ReactDOM from 'react-dom';
import Step1 from '../Step1';
import { shallow } from 'enzyme';

let incrementStepMock = jest.fn();
let questionMock = 'You are given the following array of your friends ages: [18, 29, 56, 5, 77, 1]. You have a wide variety or friends! All your friends have celebrated their birthdays this year so you want to return an updated array of ages that reflects them all aging by one year.'
let currentStepMock = 1

describe('Step1', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Step1 
        incrementStep={incrementStepMock}
        question={questionMock}
        currentStep={currentStepMock}
      />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});