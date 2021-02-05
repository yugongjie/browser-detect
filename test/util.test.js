import { compareVersion, checkBrowser } from '../src/util';

const browserInfo = {
  bot: false,
  mobile: false,
  name: 'chrome',
  version: '87.0.4280.66',
  os: 'Linux',
};

describe('compareVersion 比较版本', () => {
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
});

describe('compareVersion 参数不正确', () => {
  test('当前版本为空', () => {
    expect(compareVersion('', '85')).toBe('lte');
  });
  test('比较版本为空', () => {
    expect(compareVersion('86.4.3', '')).toBe('gte');
  });
  test('当前版本无法数字化', () => {
    expect(compareVersion('abc', '85')).toBe('lte');
  });
  test('比较版本无法数字化', () => {
    expect(compareVersion('86.4.3', 'def')).toBe('gte');
  });
});

describe('checkBrowser 浏览器严格模式检查', () => {
  test('宽松模式', () => {
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
  test('严格模式', () => {
    expect(
      checkBrowser(
        browserInfo,
        [
          {
            name: 'edge',
            rule: 'gte',
            version: '87',
          },
        ],
        true,
      ),
    ).toBe(false);
  });
});

// describe('checkBrowser 参数不规范'，()=>{

// })
