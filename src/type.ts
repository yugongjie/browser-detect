export type BrowserName =
  | 'aol'
  | 'edge'
  | 'yandexbrowser'
  | 'vivaldi'
  | 'kakaotalk'
  | 'samsung'
  | 'chrome'
  | 'phantomjs'
  | 'crios'
  | 'firefox'
  | 'fxios'
  | 'opera'
  | 'opera'
  | 'ie'
  | 'bb10'
  | 'android'
  | 'ios'
  | 'safari'
  | 'facebook'
  | 'instagram'
  | 'ios-webview'
  | 'unknown';

export type OSName =
  | 'iOS'
  | 'Android OS'
  | 'BlackBerry OS'
  | 'Windows Mobile'
  | 'Amazon OS'
  | 'Windows 3.11'
  | 'Windows 95'
  | 'Windows 98'
  | 'Windows 2000'
  | 'Windows XP'
  | 'Windows Server 2003'
  | 'Windows Vista'
  | 'Windows 7'
  | 'Windows 8'
  | 'Windows 8.1'
  | 'Windows 10'
  | 'Windows ME'
  | 'Open BSD'
  | 'Sun OS'
  | 'Linux'
  | 'Mac OS'
  | 'QNX'
  | 'BeOS'
  | 'OS/2'
  | 'Search Bot'
  | 'unknown';

export type BrowserInfo = {
  bot: boolean;
  mobile: boolean;
  name: BrowserName;
  version: string | null;
  os: OSName;
};

export type Compare = 'lte' | 'gte' | 'eq';

export type BrowserRule = {
  name: BrowserName;
  rule: Compare;
  version: string;
};
