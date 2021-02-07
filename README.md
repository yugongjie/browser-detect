# hbtv/browser-detect

## 安装方法

```bash
npm install @hbtv/browser-detect --save
```

## 使用方法-useBrowserDetect

```javascript
import useBrowserDetect from '@hbtv/browser-detect'
const {browserInfo,browserValid,OSvalid,error}=useBrowserDetect(option)
```

### API-useBrowserDetect

### Params

|  参数  |  说明  |  类型  |  默认值  |
|  ---   |  ---  |  ---  |  ---  |
|  option  |    |  Option |undefined  |

### Result

|  参数  |  说明  |  类型  |  默认值  |
|  ---   |  ---  |  ---  |  ---  |
| browserInfo|浏览器的信息|BrowserInfo||
| browserValid|是否通过browserRules的检查|boolean|true
| OSvalid|是否通过OSRules的检查|boolean|true
| error|一些错误信息|string|null

## 使用方法-BrowserDetectModal

```javascript
import BrowserDetectModal from '@hbtv/browser-detect'

const ShouleDetectBrowserComponent=()=>{
    return <><BrowserDetectModal /></>
}

```

### API-BrowserDetectModal

|  参数  |  说明  |  类型 |必填|默认值  |
|  ---   |  ---  |  ---  |  ---  |  ---  |
|  onOk  |  弹窗的ok回调  |  ()=>void  |  false  |  |
|  onCancel  |  弹窗的cancel回调  |  ()=>void  |  false  |
|  content  |  自定义提示内容  |  ReactNode  |  false  |  null  
|  title  |  自定义标题  |  ReactNode  |  false  |  null  |
|  browserRules  |  浏览器规则  |  BrowserRule  |  false  |  []  |
|  OSRules  |  操作系统规则  |  OSRules  |  false  |  []  |
|  strict  |  严格模式  |  strict  |  false  |  false  |
|  modalMode  |  弹窗模式  |  ModalMode  |  fasle  |  remind  |
|  checkMode  |  检查模式  |  CheckMode  |  false  |  once  |
|  location  |  浏览器的location  |  Location  |  false |null |
|  disable  |  不启用检查  |  boolean  |  false | false |

## Interface & Type

```typescript

type Compare = 'lte'|'gte'|'eq'|'ne'|'ex';

type BrowserName = 'aol'|'edge'|'yandexbrowser'|'wechat'|'qq'|'vivaldi'|'kakaotalk'|'samsung'|'chrome'|'phantomjs'|'crios'|'firefox'|'fxios'|'opera'|'opera'|'ie'|'bb10'|'android'|'ios'|'safari'|'facebook'|'instagram'|'ios-webview'|'unknown';

type OSName = 'iOS'|'Android OS'|'BlackBerry OS'|'Windows Mobile'|'Amazon OS'|'Windows 3.11'|'Windows 95'|'Windows 98'|'Windows 2000'|'Windows XP'|'Windows Server 2003'|'Windows Vista'|'Windows 7'|'Windows 8'|'Windows 8.1'|'Windows 10'|'Windows ME'|'Open BSD'|'Sun OS'|'Linux'|'Mac OS'|'QNX'|'BeOS'|'OS/2'|'Search Bot'|'unknown';

type CheckMode = 'once'|'onceBySession'|'eachPage';
/**
 * @type once
 * 仅第一次使用时进行检查
 * @type onceBySession
 * 每次打开会话时进行检查
 * @type eachPage
 * url变化时进行检查
 */
type ModalMode = 'remind'|'forcus';
/**
 * @type remind
 * 仅提示，弹窗可观
 * @type forcus
 * 弹窗不可关闭
 */

interface Option{
    userAgent?: string; //navigator.useAgent
    browserRules?: BrowserRule[]; //浏览器检查规则
    OSRules?: OSName[]; //操作系统检查规则
    strict?: boolean; //严格模式，开启时，仅允许规则内浏览器通过检查，关闭时则只对规则内进行检查，不在规则内的直接通过
}

interface BrowserRule{
    name: BrowserName; //常见浏览器
    rule: Compare; //比较规则
    version: string; //版本号
}

```

## Acknowledgment

[joo-browser-detect](https://github.com/shayanypn/joo-browser-detect)

## LICENCE

The MIT License (MIT)

Copyright (c) 2021 yugongjie yugongjie@gmail.com
