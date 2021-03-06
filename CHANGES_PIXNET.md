PIXNET CKEditor Changelog
====================
- 修改 css (指的是在指定 skins 裡面的檔案，ex: 修改 editor.css 等於修改 skin/moono/editor.css)

## pixnet-0.3.5
* initOn 加入錯誤處理，避免元素為 null 導致的錯誤

## pixnet-0.3.4
* 拖曳圖片到編輯區預設帶 alt, title 為檔案名稱

## pixnet-0.3.3
* 更換 iframe plugin 的 placeholder 圖片

## pixnet-0.3.0
* 更換編輯器按鈕圖檔
* 編輯器元件樣式調整

## pixnet-0.2.0
* 增加 colordialog, dialog plugins, #56356

## pixnet-0.1.6
* 圖片置中時框線符合圖片大小
* 項目符號依循文字對齊方式
* 超連結開啟方式文案與項目調整
* 更清楚提示超連結文字
* 項目符號按鈕排序調整
* 調整字型字級文案
* revert pixnet-0.1.5

## pixnet-0.1.5
* 新增圖片後，樣式不會消失

## pixnet-0.1.4
* 排除 \<p data-widget="image"> 內 img 元素為 null 導致的錯誤

## pixnet-0.1.3
* 新增可以決定是否要刪除 <span> 的設定

## pixnet-0.1.2
* 增加偵測圖片 Orientation 後，在處理增加圖片 width/height 的部份

## pixnet-0.1.1
* 移除 image2 plugin 的 hasCaption ckeckbox （已加標題之圖片）

## pixnet-0.1.0
* 升級 CKEditor 至 4.6.0
* 修正中文按下 shift + enter 後無法正常打字的問題（CKEeditor 票號 #12597）

## pixnet-0.0.15
* 修改 uploadimage/plugin.js，計算上傳圖片的寬高一定為 interger

## pixnet-0.0.14
* 新增 [image2](http://ckeditor.com/addon/image2) plugin
* 修改 image2 plugin，增加可編輯圖片標題
* 修改 uploadimage/plugin.js，拖拉上傳圖片的寬高最大邊設定不超過 600px
* 修改 uploadimage/plugin.js，在 onUploaded function 中 fire change event，使前台可以抓到 onChange event。

## pixnet-0.0.13
* 更新 skin/moono/editor.css 的 .cke_button__addimages_icon (PIXNET 新增圖片) 位置

## pixnet-0.0.12
* 修改 plugin/confighelper/plugin.js，增加當使用者 paste 的時候，會去 trigger removePlaceholder method。
 （fixed 當沒有內容時候上傳圖片會把 html 洗掉的問題）
* revert pixnet-0.0.11 在 uploadimage plugin.js 中的修改，改用上述 listen paste event 方法解決。
* 修改 plugin/clipboard/plugin.js 的 htmlifiedTextHtmlification method，不把全行空白移除。

## pixnet-0.0.11
* 修改 plugin/uploadimage/plugin.js，在 editor paste listener 被觸發的時候 trigger editor focus，確保 editor value start 更新。解決當 editor 沒有 value 上傳圖片後，confighelper/placeholder 把圖片的 HTML 清空的問題。
* 移除 CodeMirror Plugin

## pixnet-0.0.10
* 修改 plugin/enterkey/plugin.js，增加 requestAnimationFrame 增加效能

## pixnet-0.0.9
* 修改 plugin/autogrow/plugin.js, skip busy composition typing (229) for improve IE performance

## pixnet-0.0.8
* skin 切換成 moono，因為 minimalist skin 沒有自動把更新過的 icons sprite.png 的 position 更新到 ie/gecko.css 檔案裡。造成 IE 跟 FireFox 破圖。

## pixnet-0.0.7

修改 dialog.css 樣式：
* 修改 .cke_dark_background 背景色為透明色

修改 editor.css 樣式
* 修改 .cke_panel_listItem a 背景色為白色，確保不會吃到 content.css body color
* 增加 .cke_button_disabled 樣式，確保文字按鈕也有 disabled 樣式

## pixnet-0.0.6

修改 contents.css 樣式：
* 修改 pixMore 跟 pixNextPage plugins 的 class name，移除 redactor 字眼

## pixnet-0.0.5

移除 plugins:
* resize: 參考 autogrow sample code 把該 plugins 移除

修正 plugins:
* autogrow: resizeEditor method 裡傳送 event 到 autogrow data 裡頭

修改 editor.css 樣式：
* 增加 cke_editor_pix-ckeditor merge-bottom

## pixnet-0.0.4

新增 plugins:
* CodeMirror: http://ckeditor.com/addon/codemirror

新增 editor.css 樣式:
* 從 skins/moono 複製 notification.css 樣式放在 minimalist editor.css 裡

修改 editor.css 樣式：
* 修改 cke_button__addimages plugins 樣式，因為新增了 CodeMirror 後更新了 icon sprites position


