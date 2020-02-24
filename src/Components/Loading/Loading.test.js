import React from 'react';
import Loading from './Loading';
import { shallow } from 'enzyme';

describe('Loading', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loading />)
  })

  it ('should render a Loading component', () => {
    expect(wrapper).toMatchSnapshot()
  })

})
