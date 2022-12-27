export const text = "## 💡 Web Editor Markdown\n[web-editor-markdown](https://github.com/Ben-love-zy/web-editor-markdown.git) is a Markdown editor in Web browser and for real-time rendering like `Typora`. It is based on TypeScript and JavaScript, and does not rely on any third-party framework. It supports Chinese friendly and can be easily extended and connected to native JavaScript, Vue, React, Angular and other applications. It provides four rendering modes: `SOURCE`, `SOURCE_AND_PREVIEW`, `RENDER` and `PREVIEW`. If necessary, its underlying layer also supports the ability of collaborative editing and provides atomic `Operation` for extending collaborative editing.\n### ✨ English Demo\n![](https://static.yximgs.com/udata/pkg/IS-DOCS-MD/zengyong/img/demo-en.gif)\n### ✨ Chinese Demo\n![](https://static.yximgs.com/udata/pkg/IS-DOCS-MD/zengyong/img/demo-zh.gif)\n### 🛠️ Getting started\n* install it\n```shell\nnpm install web-editor-markdown --save\n```\n* use it\n```ts\nimport { Editor, withUndoRedo } from 'web-editor-markdown';\nlet editor = new Editor(document.getElementById(\'id\'));\neditor = withUndoRedo(editor); // UndoRedo Plugin\neditor.insertTextAtCursor(\'**This is a bold text**\\n> tips：You can switch source mode with `cmd+/`\');\n```\n* others\n```ts\nimport { EditorViewMode } from 'web-editor-markdown';\neditor.switchViewMode(EditorViewMode.PREVIEW); // switch rendering mode，(shortcut key: \'cmd+/\')\nconsole.log(\'content\', editor.getContent());\n```\n* local source\n```shell\nnpm install\nnpm start\n```\n"