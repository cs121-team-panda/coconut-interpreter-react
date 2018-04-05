import React from 'react';
import { shallow /* mount */ } from 'enzyme';
import AceEditor from 'react-ace';

import Output from '../Output';
// import Header from '../Header';

it('renders without crashing', () => {
  shallow(<Output value="" />);
});

/* TODO
it('allows us to set props', () => {
  const wrapper = mount(<Output value="Hello, world" loading={false} />);
  expect(wrapper.props().value).toEqual('Hello, world');
});
*/

/* TODO
it('renders one <Header /> component', () => {
  const wrapper = shallow(<Output value="" loading={false} />).dive();
  expect(wrapper.find(Header)).toHaveLength(1);
});
*/

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(<Output value="" loading={false} />).dive();
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});

/* TODO
it('simulates change events', () => {
  const wrapper = shallow(<Output value="" loading={false} />).dive();
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(wrapper.state('showPython')).toEqual(true);
});
*/
