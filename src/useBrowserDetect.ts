import { browserRules, osRules, mobileRuleFirstQuery, mobileRuleSecondQuery } from './rules';
import { BrowserInfo, BrowserName, BrowserRule, Compare, OSName } from './type';
import { checkBrowser, checkOS, compareVersion } from './util';
/**
 * @param userAgent
 * navigator.useAgent
 * @param browserRules
 * 浏览器检查
 * @param OSRules
 * 操作系统检查
 * @param strict
 * 严格检查模式
 * 只允许声明的规则内的浏览器
 *
 *
 */
interface UseBrowserDetect {
  (options?: {
    userAgent?: string;
    browserRules?: BrowserRule[];
    OSRules?: OSName[];
    strict?: boolean;
  }): {
    browserInfo?: BrowserInfo | null;
    browserValid: boolean;
    OSValid: boolean;
    error?: string;
  };
}

// TODO Bot
const detectBot = () => {};

const detectMobile: (userAgent: string) => boolean = userAgent => {
  return mobileRuleFirstQuery.test(userAgent) || mobileRuleSecondQuery.test(userAgent.substr(0, 4));
};

const detectOS = (userAgent: string) => {
  const detected = osRules.filter(item => {
    const [name, rule] = item;
    return rule && rule.test(userAgent);
  })[0];
  return detected ? detected[0] : 'unknown';
};

const detect: (userAgent: string) => BrowserInfo | null = userAgent => {
  if (!userAgent) {
    return null;
  }
  return (
    browserRules
      .map(item => {
        const [name, rule] = item;
        const match = rule.exec(userAgent);

        const versionNumber = match && match[1].split(/[._]/);

        return (
          match && {
            bot: false,
            mobile: detectMobile(userAgent),
            name: name,
            version: versionNumber?.join('.') || null,
            os: detectOS(userAgent),
          }
        );
      })
      .filter(Boolean)[0] || null
  );
};

const detectBrowserInfo = (userAgent?: string) => {
  if (typeof userAgent === 'string') return detect(userAgent);
  if (typeof navigator !== 'undefined') return detect(navigator.userAgent);
  //   TODO 处理node
  return null;
};

const useBrowserDetect: UseBrowserDetect = options => {
  const userAgent = options?.userAgent;
  const browserRules = options?.browserRules || [];
  const OSRules = options?.OSRules || [];
  const strict = options?.strict || false;
  // 获取浏览器的基本信息
  const browserInfo = detectBrowserInfo(userAgent);
  // 如果没有浏览器信息
  if (!browserInfo)
    return {
      browserInfo: null,
      browserValid: false,
      OSValid: false,
      error: '没有获取到浏览器信息',
    };

  return {
    browserInfo,
    browserValid: browserRules ? checkBrowser(browserInfo, browserRules, strict) : true,
    OSValid: OSRules ? checkOS(browserInfo, OSRules) : true,
  };
  // 如果没有浏览器和os列表则valid返回true
};

// const BrwoserInfoInstance = (browserInfo: BrowserInfo) => {
//   return {
//     isMobile: false,
//     isBot: false,
//     checkBrowser: () => false,
//     checkOs: () => false,
//   };
// };

export default useBrowserDetect;
