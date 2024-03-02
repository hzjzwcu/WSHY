# VSCode 使用

## VSCode 常用插件

| 插件名                                                       | 插件说明                                         |
| ------------------------------------------------------------ | ------------------------------------------------ |
| [Chinese (Simplified)](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans) | 中文语言包                                       |
| [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag) | 包含标签闭合与重命名两个子插件                   |
| [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) | 括号高亮                                         |
| [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) | 运行当前打开的代码文件                           |
| [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) | Vue2 代码规范（在 Vue3 中建议禁用）              |
| [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) | Vue3 代码规范                                    |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | 代码规范                                         |
| [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | 代码样式                                         |
| [Polacode-2020](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.polacode-2019) | 代码截图                                         |
| [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) | SSH 链接远程服务器                               |
| [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log) | 选中变量按下快捷键 `Ctrl + Alt + L` 生成 console |
| [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons) | 左侧菜单栏图标                                   |
| [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) | 启动本地服务                                     |
| [Dracula Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula) | 主题颜色                                         |
| [koroFileHeader](https://marketplace.visualstudio.com/items?itemName=OBKoro1.korofileheader) | 注释插件                                         |

## 配置

用户配置（全局配置）

```json
{
  // 左侧文件栏：缩进、图标
  "workbench.tree.indent": 16,
  "workbench.iconTheme": "vscode-icons",
  // Git：同步前确认、无暂存时提交所有更改、忽略空格
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "diffEditor.ignoreTrimWhitespace": false,
  // 文件名更改时自动变更引用路径
  "javascript.updateImportsOnFileMove.enabled": "always",
  // 输出界面智能滚动
  "output.smartScroll.enabled": false,
  // 编辑器主题
  "workbench.colorTheme": "Dracula",
  // 默认格式化规则
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  // code-runner：运行前自动保存
  "code-runner.saveFileBeforeRun": true,
  "remote.SSH.remotePlatform": {
    "remote-dev": "linux"
  },
  // 默认指令方式
  "terminal.integrated.defaultProfile.windows": "Command Prompt",
  "eslint.alwaysShowStatus": true,
  "window.zoomLevel": 1,
  // 自动注释插件
  // 头部注释
  "fileheader.customMade": {
    "Author": "ULQUIARROSYX", // 创建文件的作者
    "LastEditors": "ULQUIARROSYX", // 文件最后编辑者
    "LastEditTime": "Do not edit", // 文件最后编辑时间
    "FilePath": "Do not edit", // 文件在项目中的相对路径 自动更新
    "Description": "" // 介绍文件的作用、文件的入参、出参。
  },
  // 函数注释
  "fileheader.cursorMode": {
    "description": "", // 函数注释生成之后，光标移动到这里
    "param": "", // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行
    "return": ""
  }
}

```

工作区配置

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript", "html", "typescript"],
    "editor.formatOnSave": true,
    "[vue]": {
        "editor.defaultFormatter": "johnsoncodehk.volar"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```