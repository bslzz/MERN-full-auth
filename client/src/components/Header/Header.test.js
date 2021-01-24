import { shallow } from 'enzyme';
import Header from './Header';

it('check menus from Header', () => {
  const wrapper = shallow(<Header />);
  const link = wrapper.find('h1');
  const result = link.text();

  expect(result).toBe('Bis');
});
