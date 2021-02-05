import { BrowserInfo, BrowserRule, Compare, OSName } from './type';

const FormatVersionToNumber = (version: any) => {
  let temp = 0;
  try {
    temp = Number(version);
  } catch (e) {
    console.warn('传入的参数不合法', e);
  }
  return temp || 0;
};

export const compareVersion: (current: string, target: string) => Compare = (
  current: string,
  target: string,
) => {
  const currentVersionArray = current.split(/[._]/);
  const targetVersionArray = target.split(/[._]/);

  for (let i = 0; i < currentVersionArray.length; i += 1) {
    const currentVersionItem = FormatVersionToNumber(currentVersionArray[i]);

    const targetVersionItem = FormatVersionToNumber(targetVersionArray[i]);

    if (currentVersionItem > targetVersionItem) {
      return 'gte';
    }
    if (currentVersionItem < targetVersionItem) {
      return 'lte';
    }
  }
  return 'eq';
};

export const checkOS = (browserInfo: BrowserInfo, OSRules: OSName[]) =>
  OSRules.includes(browserInfo.os);
/**
 *
 * @param strict
 * 开启严格模式时，必须是rules内的浏览器才通过检查
 * 未开启严格模式时，今对rules内的进行检查，rules中没有的都可以通过
 */
export const checkBrowser = (
  browserInfo: BrowserInfo,
  browserRules: BrowserRule[],
  strict: boolean = false,
) =>
  browserRules.every(item => {
    const { name, rule, version } = item;

    if (name === browserInfo.name) {
      if (rule === 'ex') {
        // 不能包含该浏览器
        return false;
      }
      if (!browserInfo.version || !version) return false;
      switch (rule) {
        case 'lte':
        case 'gte':
        case 'eq':
          return rule === compareVersion(browserInfo.version, version);
        case 'ne':
          return compareVersion(browserInfo.version, version) !== 'eq';
        default:
          return 'ne';
      }
    }
    // 规则中没有当前浏览器，判断严格模式
    return !strict;
  });
