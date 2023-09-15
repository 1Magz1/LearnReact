import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
  test('with only one param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });
  test('with mods', () => {
    const expectValue = 'someClass red';

    expect(
      classNames(
        'someClass',
        { red: true, long: false },
      ),
    ).toBe(expectValue);
  });

  test('with additional', () => {
    const expectValue = 'someClass red primary secondary';

    expect(
      classNames(
        'someClass',
        {
          red: true,
          long: false,
          secondary: undefined,
        },
        ['primary', 'secondary'],
      ),
    ).toBe(expectValue);
  });
});
