import { BrowserInfo, BrowserName, BrowserRule, Compare, OSName } from './type';

export const checkOS = (browserInfo: BrowserInfo, OSRules: OSName[]) => {
  return OSRules.includes(browserInfo.os);
};
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
) => {
  return browserRules.every(item => {
    const { name, rule, version } = item;

    if (name === browserInfo.name) {
      return browserInfo.version ? rule === compareVersion(browserInfo.version, version) : false;
    }
    return strict ? false : true;
  });
};

export const compareVersion: (current: string, target: string) => Compare = (
  current: string,
  target: string,
) => {
  const currentVersionArray = current.split(/[._]/);
  const targetVersionArray = target.split(/[._]/);

  for (let i = 0; i < currentVersionArray.length; i += 1) {
    const currentVersionItem = Number(currentVersionArray[i]);
    const targetVersionItem = Number(targetVersionArray[i]) || 0;

    if (currentVersionItem > targetVersionItem) {
      return 'gte';
    }
    if (currentVersionItem < targetVersionItem) {
      return 'lte';
    }
  }
  return 'eq';
};
