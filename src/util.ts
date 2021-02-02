import { BrowserInfo, BrowserName, Compare, OSName } from './type';

export const checkOS = (browserInfo: BrowserInfo, OSRules: OSName[]) => {
  return OSRules.includes(browserInfo.os);
};

export const checkBrowser = (
  browserInfo: BrowserInfo,
  browserRules: { name: BrowserName; rule: Compare; version: string }[],
) => {
  return browserRules.every(item => {
    const { name, rule, version } = item;

    if (name === browserInfo.name) {
      return browserInfo.version ? rule === compareVersion(browserInfo.version, version) : false;
    }
    return true;
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
