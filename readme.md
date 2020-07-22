# 書式設定について
キャラセット・改行コード・インデントなどの書式を統一するため**.editorconfig **を作成しています。
- プラグインなしで対応しているエディタ
	- BBEdit
	- Coda
	- Clion
	- GitHub
	- RubyMine
	- Intellij IDEA
	- Source Lair
	- WebStorm
- プラグインをインストールして対応するエディタ
	- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig "Visual Studio Code")
	- [ATOM](https://github.com/sindresorhus/atom-editorconfig#readme "ATOM")
	- [Brakets](https://github.com/kidwm/brackets-editorconfig/ "Brakets")
	- [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime#readme "Sublime Text")
# ディレクトリ構成

```
root
├── dist //公開ディレクトリ
│   ├── assets //外部ファイルを格納
│   │   ├── css //CSS
│   │   │   └── style.min.css
│   │   ├── img
│   │   │   └── cat_01.jpg
│   │   └── js
│   │       └── main.min.js
│   └── index.html
├── gulpfile.js //タスクランナー
│   ├── index.js
│   └── path.js
├── package-lock.json
├── package.json
├── readme.md
└── src
    ├── aboutus
    │   └── index.ejs
    ├── assets
    │   ├── img
    │   ├── js
    │   │   └── main.js
    │   ├── module
    │   │   ├── _breadcrumb.ejs
    │   │   ├── _footer.ejs
    │   │   ├── _head.ejs
    │   │   └── _header.ejs
    │   └── scss
    │       ├── foundation
    │       │   ├── _init.scss
    │       │   ├── _mixin.scss
    │       │   ├── _reset.scss
    │       │   └── _variable.scss
    │       ├── layout
    │       │   ├── _container.scss
    │       │   ├── _footer.scss
    │       │   ├── _header.scss
    │       │   └── _main.scss
    │       ├── object
    │       │   ├── component
    │       │   │   └── _heading.scss
    │       │   ├── individual
    │       │   │   └── _home.scss
    │       │   ├── project
    │       │   │   └── _grid.scss
    │       │   └── utility
    │       │       ├── _align.scss
    │       │       ├── _display.scss
    │       │       ├── _font.scss
    │       │       ├── _margin.scss
    │       │       └── _padding.scss
    │       └── style.scss
    └── index.ejs
```

