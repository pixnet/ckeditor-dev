# CKEditor 4 - The best browser-based WYSIWYG editor

[![devDependency Status](https://david-dm.org/ckeditor/ckeditor-dev/dev-status.svg)](https://david-dm.org/ckeditor/ckeditor-dev#info=devDependencies)

This repository contains the development version of CKEditor.

**Attention:** The code in this repository should be used locally and for
development purposes only. We do not recommend using it in production environment
because the user experience will be very limited. For that purpose, you should
either build the editor (see below) or use an official release available on the
[CKEditor website](http://ckeditor.com).

## For PIXNET

為了符合 PIXNET 使用，PIXNET 自行修改/新增了以下部分：

  - **plugins** &ndash; [confighelper](https://github.com/AlfonsoML/confighelper)
  - **skins** &ndash; [minimalist](https://github.com/albatrossdigital/ckeditor-skin-minimalist)
  - **Makefile** &ndash; 新增 makefile
  - **grunt task** &ndash; 新增 concat:lang Task 處理把 dist 內部的 ckeditor.js 跟 lang/*.js conat 成一份檔案
  - **dist** &ndash; 新增 dist 資料夾，存放 release 檔案
  - **bower** &ndash; 新增 bower.json，並確認只有 dist 底下資訊被 publish

新增/修改 Styles：
  - skins/*.css: 可直接修改
  - content.css: 可直接修改

建置檔案：
  - 修改/新增 完畢後，下 make 後會自動 build 出新的 dist 目錄

**新增修改的 CHANGES LOG 請記得更新在 CHANGES_PIXNET.md**

開發注意事項:
  - 由於在新後台發生 #56118 將非正式發布版本推到正式環境的問題，擬定建議的開發流程如下

  - 在 branch 開發
	- 編輯器 repository
	  - 將修正的結果 commit 到 ckeditor-dev repository，make 指令 build 出新的目錄。
	  - git push 到 branch 上

	- 使用編輯器的 repository (ex. 新後台)
	  - 在安裝編輯器 repository 的 bower.json，ckeditor-dev 項目加上 branch name 的 hashtag `git@github.com:pixnet/ckeditor-dev.git#ticket56118` 後，推上 alpha site 給需求端測試。

  - master
	- 編輯器 repository
	  - ckeditor-dev 分支調整 merge 進 master
	  - git tag -a [版本號]
	  - git push --tags

	- 使用編輯器的 repository
	  - 調整的 branch revert branch name hashtag 的 commit
	  - merge 到 master
	  - bower.json ckeditor-dev hashtag 改成新的版本號 `git@github.com:pixnet/ckeditor-dev.git#pixnet-0.2.0`
	  - 執行 make 確認測試站是否為最新的調整結果。
	  - deploy 到正式環境。

## Code Installation

There is no special installation procedure to install the development code.
Simply clone it to any local directory and you are set.

## Available Branches

This repository contains the following branches:

  - **master** &ndash; Development of the upcoming minor release.
  - **major** &ndash; Development of the upcoming major release.
  - **stable** &ndash; Latest stable release tag point (non-beta).
  - **latest** &ndash; Latest release tag point (including betas).
  - **release/A.B.x** (e.g. 4.0.x, 4.1.x) &ndash; Release freeze, tests and tagging.
    Hotfixing.

Note that both **master** and **major** are under heavy development. Their
code did not pass the release testing phase, though, so it may be unstable.

Additionally, all releases have their respective tags in the following form: 4.4.0,
4.4.1, etc.

## Samples

The `samples/` folder contains some examples that can be used to test your
installation. Visit [CKEditor SDK](http://sdk.ckeditor.com/) for plenty of samples
showcasing numerous editor features, with source code readily available to view, copy
and use in your own solution.

## Code Structure

The development code contains the following main elements:

  - Main coding folders:
    - `core/` &ndash; The core API of CKEditor. Alone, it does nothing, but
    it provides the entire JavaScript API that makes the magic happen.
    - `plugins/` &ndash; Contains most of the plugins maintained by the CKEditor core team.
    - `skin/` &ndash; Contains the official default skin of CKEditor.
    - `dev/` &ndash; Contains some developer tools.
    - `tests/` &ndash; Contains the CKEditor tests suite.

## Building a Release

A release-optimized version of the development code can be easily created
locally. The `dev/builder/build.sh` script can be used for that purpose:

	> ./dev/builder/build.sh

A "release ready" working copy of your development code will be built in the new
`dev/builder/release/` folder. An Internet connection is necessary to run the
builder, for its first time at least.

## Testing Environment

Read more on how to set up the environment and execute tests in the [CKEditor Testing Environment](http://docs.ckeditor.com/#!/guide/dev_tests) guide.

## Reporting Issues

Please use the [CKEditor Developer Center](https://dev.ckeditor.com/) to report bugs and feature requests.

## License

Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.

For licensing, see LICENSE.md or [http://ckeditor.com/license](http://ckeditor.com/license)
