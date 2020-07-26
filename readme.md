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
├── gulpfile.js //タスクランナー(gulp)の実行ファイルを格納
│   ├── index.js //本体ファイル
│   └── path.js //パス情報を記述
├── package-lock.json
├── package.json
├── readme.md
└── src //開発ディレクトリ
    ├── aboutus
    │   └── index.ejs
    ├── assets
    │   ├── img
    │   ├── js
    │   │   └── main.js
    │   ├── module //ejsのモジュールを格納
    │   │   ├── _breadcrumb.ejs
    │   │   ├── _footer.ejs
    │   │   ├── _head.ejs
    │   │   └── _header.ejs
    │   └── scss //SASS（SCSS)を格納。構成はFLOCSS（フロックス）に準拠
    │       ├── foundation
    │       │   ├── _init.scss
    │       │   ├── _mixin.scss
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
    │       └── style.scss //SCSSをインポートする大本のSASSファイル
    └── index.ejs
```
# タスクランナー
## 動作確認済みのPC環境
- OS : macOS 10.15
- Node.js : v.12.16.0
- npm : v6.13.4
## gulpファイル一覧
- gulpfile/index.js : パッケージのインクルードやタスクなどを記述している本体ファイル
- gulpfile/path.js : 開発環境内のディレクトリやファイルの情報を記述。本体ファイル内でインクルードして使用。
### タスク一覧
#### styleTask
開発ディレクトリ内のSASSをCSSに変換し公開ディレクトリに生成するタスクです。
- gulp-sass-globによりsassファイルのインポートを*でまとめて指定しています。
- animate.cssとress.cssをnpmでインストールしており、gulp-postcssとpostcss-importを使ってインポートしています。
- CSSをミニファイ化して、リネームしたファイルを公開ディレクトリに生成。
#### scriptTask
開発ディレクトリ内のJavaScriptを変換して公開ディレクトリに生成するタスクです。
- gulp-babelでes2015以降の記述はes5にトランスコンパイルされます。
- gulp-uglify-esでミニファイ化したファイルをリネームし、公開ディレクトリに生成します。
####
### タスクランナー実行コマンド
すべてのタスクを実行します。
```
npx gulp
```

