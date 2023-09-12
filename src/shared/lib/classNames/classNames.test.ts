import { classNames } from './classNames';

describe('classNames', () => {
  test('with only one param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });
});
