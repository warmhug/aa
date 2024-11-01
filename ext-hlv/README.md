# ext-hlv

https://code.visualstudio.com/api/get-started/your-first-extension

[configuration](https://code.visualstudio.com/api/references/contribution-points#Configuration-property-schema)
[schema](http://json-schema.org/draft-07/schema#)

- https://dev.azure.com/warmhug
- https://marketplace.visualstudio.com/manage/publishers/warmhug

```sh
# 使用 node@16 和 pnpm 会报错，使用 node@18 npm
sudo npm install -g @vscode/vsce
npm i

npm run pack
# vsce package  生成 vsix 文件
# code --install-extension ext-hlv-0.0.1.vsix  安装扩展
```

调试

- 双击打开 src/extension.ts 文件，按 F5 或 CMD SHIFT P (Debug: Start Debugging)。
- 在 Extension Development Host 窗口中，按下 Cmd+Opt+I 打开开发者工具，查看 console 输出。



# vscode
> 2020 ~ 2024

- 按`cmd shift p` 输入 code zoom reload(未知错误) diplay(修改语言) 等命令。
- 在查找(替换)框里按 ctrl + enter 支持多行，或者 复制多行文本 粘贴。
- 端口 [转发](https://code.visualstudio.com/docs/editor/port-forwarding) 实现 [内网穿透](https://51.ruyo.net/18562.html)，目前已被 [国内禁用](https://github.com/microsoft/vscode-remote-release/issues/9438)
- 所有内置命令(built-in commands)
  - https://code.visualstudio.com/api/references/commands
  - https://code.visualstudio.com/docs/getstarted/keybindings
  - https://gist.github.com/skfarhat/4e88ef386c93b9dceb98121d9457edbf


https://github.com/jianbingfang/vscode-dup-checker

[tab group 建议](https://github.com/microsoft/vscode/issues/100335#issuecomment-964358943)
扩展 [推荐](https://github.com/viatsko/awesome-vscode):
- plantuml(设置指定server) / Auto Hide / Live Preview / Markdown All in One / markdown-pdf / marp / GitLens / pangu / Hungry Delete / Template String Converter
- Code Runner / Terminal Keeper / Commands(usernamehw) / Todo Tree / Excalidraw / npm-dependency-links / Bookmarks / Diff Folders / Editor Group Minimizer Plus / favorites

```json
// 快捷键 设置
[
  { "key": "cmd+d", "command": "editor.action.copyLinesDownAction" },
  { "key": "alt+`", "command": "terminal.open" }
]
// markdown-pdf 扩展设置
{
  "markdown-pdf.displayHeaderFooter": false,
  "markdown-pdf.margin.bottom": "0.01cm",
  "markdown-pdf.margin.top": "0.01cm",
  "markdown-pdf.margin.left": "0.5cm",
  "markdown-pdf.margin.right": "0.5cm"
}
```

常用设置
`xxProj/.vscode/settings.json`
```json
{
  "editor.tabSize": 2,
  "prettier.singleQuote": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "search.exclude": {
    "**/dist": true,
  }
}
```
tasks `xxProj/.vscode/tasks.json`
代码片段 `xxProj/.vscode/my.code-snippets`、
Bookmarks扩展 `xxProj/.vscode/bookmarks.json`


## extension

```json
{
  "version": "0.0.1",
  "name": "ext-hlv",
  "displayName": "aa-ext-hlv",
  "publisher": "warmhug",
  "activationEvents": [
    "onStartupFinished"
  ],
  "main": "./dist/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "warmhug.demo",
        "title": "warmhug: demo"
      }
    ],
    "menus": {
      "editor/title": [
        {
          "when": "editorLangId == markdown",
          "menuPath": "navigation/jumptobookmark",
          "group": "z_commands",
          "command": "warmhug.simpleBookmark.list",
          "title": "%(arrow-right) Jump To Bookmark"
        }
      ]
    },
    "keybindings": [],
    "definitions": {
      "terminalItem": {
        "type": "object",
        "required": ["cwd"],
        "default": {
          "cwd": "/Users/hua/"
        },
        "properties": {
          "cwd": {
            "type": "string",
            "description": "terminal tab cwd",
            "default": "/Users/hua/inner/"
          },
          "name":{
            "type": "string",
            "description": "terminal tab name",
            "default": "~"
          }
        }
      }
    },
    "configuration": {
      "type": "object",
      "title": "aa-ext-hlv",
      "properties": {
        "refDemo": {
          "anyOf": [
            {
              "type": "object",
              "$ref": "#/definitions/terminalItem"
            },
            {
              "type": "array",
              "items": { "$ref": "#/definitions/terminalItem" }
            }
          ]
        }
      }
    }
  }
}
```

## settings.json
> 用户或项目目录

插件 Commands(usernamehw)

```js
{
  "commands.commands": {
    // 运行内置的 task 命令
    "Run task": {
      "command": "workbench.action.tasks.runTask",
      "args": "run-my-shell",
    },
    "reloadWindow": {
      "command": "workbench.action.reloadWindow"
    },
    "SecondarySideBar": {
      "command": "workbench.action.toggleAuxiliaryBar",
      // "command": "workbench.action.togglePanel",
      "statusBar": {
        "text": "SecondaryBar",
        "color": "yellow",
        "alignment": "left",
        "priority": -9999,
      },
    },
    // "Focus terminal named 'foobar'": {
    //   "command": "commands.focusTerminal",
    //   "args": {
    //     "target": "newest",// focus newest matching terminal; create new if no match
    //     "name": "foobar",// if no match, assign a name to the new terminal
    //   },
    // },
    // "Terminal: Run Watch": {
    //   "command": "workbench.action.terminal.sendSequence",
    //   "args": {
    //     "text": "npm run watch\r",
    //   },
    // },
    // "Organize imports": {
    //     "command": "editor.action.codeAction",
    //     "args": {
    //       "kind": "source.organizeImports",
    //     },
    // },
    // "Insert snippet": {
    //   "command": "editor.action.insertSnippet",
    //   "args": {
    //     "snippet": "$BLOCK_COMMENT_START ${0:?} $BLOCK_COMMENT_END",
    //   },
    // },
  },
}
```

## tasks.json

```js
{
  // See https://code.visualstudio.com/docs/editor/tasks
  // 变量 https://code.visualstudio.com/docs/editor/variables-reference#_input-variables
  "version": "2.0.0",
  "tasks": [
    {
      "label": "run-my-shell",
      "type": "shell",
      "problemMatcher": [],
      "command": "echo  ${workspaceFolder} ${fileDirname} ${file} ",
      // "command": "./scripts/test.sh",
      // 命令面板 reload 即可运行
      // "runOptions": { "runOn": "folderOpen" },
    }
  ]
}
```

## my.code-snippets

```js
{
  // Place your snippets for markdown here. Each snippet is defined under a snippet name and has a prefix, body and description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the same ids are connected.
	// 自动生成 https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	},
  "import": {
    "prefix": "imp",
    "body": [
      "import $1 from '$1';"
    ],
    "description": "import"
  },
  "setTimeout": {
    "prefix": "sto",
    "body": [
      "setTimeout(() => {}, 1000);"
    ],
    "description": "setTimeout"
  },
  "python server": {
    "scope": "shellscript",
    "prefix": "pys",
    "body": [
      "python3 -m http.server 3000"
    ],
    "description": "start python server"
  },
	"Add link": {
		"prefix": "[]",
		"body": [
			"[]($1)",
			"$2"
		],
		"description": "add link"
	},
  // from slardar snippets
  "useState snippet": {
    "prefix": "ust",
    "body": "const [${1}, set${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}] = useState(${2:default${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}});",
    "description": "use state but it camel cases"
  },
  "reduck action": {
    "scope": "typescript",
    "prefix": "raction",
    "body": ["$1 : (state$2) => {", "$0", "", "}"],
    "description": "reduck action 快速创建"
  },
  "React unit test basic render": {
    "scope": "typescriptreact",
    "prefix": "reacttest",
    "body": [
      "import React from 'react';",
      "import { render, screen } from '@slardar/common-utils';",
      "import ${TM_DIRECTORY/^.+\\/(.*)$/$1/} from './${TM_DIRECTORY/^.+\\/(.*)$/$1/}';",
      "",
      "describe('${TM_DIRECTORY/^.+\\/(.*)$/$1/}', () => {",
      "  test('should be able to render', () => {",
      "    render(<${TM_DIRECTORY/^.+\\/(.*)$/$1/} />, { testId: 'node' });",
      "    expect(screen.getByTestId('node')).toBeDefined();",
      "  });",
      "});",
      ""
    ],
    "description": "React unit test skeleton basic component rendering"
  },
  "byted form生成": {
    "scope": "typescriptreact",
    "prefix": "bform",
    "body": [
      "import React, { useCallback } from 'react';",
      "import { Form } from '@slardar/byted';",
      "",
      "const FormItem = Form.Item;",
      "const FormControl = Form.Control;",
      "",
      "interface I${1:${TM_FILENAME_BASE}}Props {}",
      "",
      "const ${1:${TM_FILENAME_BASE}}: React.FC<I${1:${TM_FILENAME_BASE}}Props> = params => {",
      "  return (",
      "    <FormItem>",
      "      <FormControl field=\"\"></FormControl>",
      "    </FormItem>",
      "  );",
      "};",
      "",
      "export default ${1:${TM_FILENAME_BASE}}",
      ""
    ],
    "description": "byted form生成"
  },
  "react组件模版": {
    "scope": "typescriptreact",
    "prefix": "rcfc",
    "body": [
      "import React from 'react';",
      "import styled from 'styled-components';",
      "",
      "interface I$1Props {}",
      "",
      "const $1: React.FC<I$1Props> = () => {",
      "  return (",
      "    <>$0</>",
      "  );",
      "};",
      "",
      "export default $1"
    ],
    "description": "react组件模版"
  },
}
```

## my.code-workspace

```js
// [可选]创建 配置 Multi-root Workspaces
// 或者在 Multi-root Workspaces 的 .vscode/settings.json
// 修改 typescript 编译器， 工作区修改 lint 配置
{
  "folders": [
    { "name": "ROOT", "path": "./" },
    { "name": "slardar", "path": "./slardar" },
  ],
  "settings": {
    "typescript.tsdk": "slardar/node_modules/typescript/lib"
    "eslint.workingDirectories": [{"mode": "auto"}]
  }
}
```
