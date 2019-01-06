import React from 'react';
import ReactDOM from 'react-dom';
import Instructions from '../Instructions';
import { shallow } from 'enzyme';

describe('Instructions', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Instructions />
    );
  });

  it('should match the snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });
});