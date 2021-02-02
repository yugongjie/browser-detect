import { compareVersion, checkBrowser } from '../src/util';

const browserInfo = {
  bot: false,
  mobile: false,
  name: 'chrome',
  version: '87.0.4280.66',
  os: 'Linux',
};

test('主版本大', () => {
  expect(compareVersion('86.4.3', '85')).toBe('gte');
});

test('主版本相等，副版本大', () => {
  expect(compareVersion('86.4.3', '86.3')).toBe('gte');
});

test('主版本小', () => {
  expect(compareVersion('86.4.3', '87.2.3')).toBe('lte');
});

test('主版本相等，副版本小', () => {
  expect(compareVersion('86.4.3', '86.5')).toBe('lte');
});

test('版本相等', () => {
  expect(compareVersion('86.4.3', '86.4.3')).toBe('eq');
});

test('checkBrowser', () => {
  expect(
    checkBrowser(browserInfo, [
      {
        name: 'chrome',
        rule: 'gte',
        version: '87',
      },
      {
        name: 'edge',
        rule: 'gte',
        version: '87',
      },
    ]),
  ).toBe(true);
});
