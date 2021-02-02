# my-lib 

## 安装方法

`npm install @hbtv/browser-detect --save`

## 使用方法

```javascript

import useBrowserDetect from '@hbtv/browser-detect'
const browserInfo=useBrowserDetect(option)
```

## API

### Params

|  参数  |  说明  |  类型  |  默认值  |
|  ---   |  ---  |  ---  |  ---  |
|  option  |    |  Option  | `undefined`  |

#### Option

### Result

|  参数  |  说明  |  类型  |  默认值  |
|  ---   |  ---  |  ---  |  ---  |
| browserInfo | 浏览器的信息 | BrowserInfo | |
| browserValid | 是否通过browserRules的检查 | boolean | true
| OSvalid | 是否通过OSRules的检查 | boolean | true
| error | 一些错误信息 | string | null

#### BrowserInfo

|  参数  |  说明  |  类型  |  默认值  |
|  ---   |  ---  |  ---  |  ---  |

## Acknowledgment

[joo-browser-detect](https://github.com/shayanypn/joo-browser-detect)

## LICENCE

The MIT License (MIT)

Copyright (c) 2021 yugongjie yugongjie@gmail.com
