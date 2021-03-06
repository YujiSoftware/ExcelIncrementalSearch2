#Excelインクリメンタルサーチ2

[ダウンロードはこちら](http://hp.vector.co.jp/authors/VA049605/excel_incremental_search/download.html "ダウンロード")

##これは何？
**Excelの表を、すごく検索しやすくするツールです。**
（QA表, 不具合表... etc）
![イメージ](http://hp.vector.co.jp/authors/VA049605/excel_incremental_search/capture.png)  
[サンプルはこちら](http://hp.vector.co.jp/authors/VA049605/excel_incremental_search/sample.htm)

このツールを使うと、**Excelの表をブラウザ上で素早く、わかりやすく**検索できます。  
Excelからの変換は、該当範囲を選択してボタンを押すだけ。**手間がかかりません。**  
また、ExcelのHTML出力機能を使用しているため**文字色や下線などはそのまま反映されます。**

ぜひ、ご活用ください！

##使い方

1. 「ExcelIncrementalSearch.xla」をダブルクリックします。  
マクロについて聞かれますが、「マクロを有効にする」をクリックしてください。  
![Excelインクリメンタルサーチのアイコン](http://hp.vector.co.jp/authors/VA049605/excel_incremental_search/xla_icon.png)
3. Excel上でHTMLファイルにしたい範囲を選択し、アドインタブに追加された「HTMLファイルを生成」をクリックします。  
![Excelインクリメンタルサーチのツールバー](http://hp.vector.co.jp/authors/VA049605/excel_incremental_search/toolbar.png)

**これで出来上がりです！**  
元になったファイルと同じ場所に、ファイル名と同じHTMLファイルが生成されます。  
（このとき、画像や設定ファイルなどが入った .files というフォルダも一緒に生成されます。 ほかの方に渡すときは、こちらのフォルダも併せてコピーしてください）

##アドインの登録

このツールは、Excelのアドインとしても使うことができます。  
（アドインとして登録すると、ツールバーが常に表示されるようになります）  

アドインとして登録する場合は、付属の「**register.vbs**」をダブルクリックしてください。  
（ファイルを別の場所に移動した際は、**下記のアドインの解除を実施後**、再度上記のファイルをダブルクリックしてください）  

##アドインの解除

アドインとして登録後に使用を中止される際は、アドインの解除が必要です。  
Excelを終了して、付属の「unregister.vbs」をダブルクリックしてください。  
あとは、各種ファイルを削除してしまってかまいません。  

unregister.vbs を実行せず削除してしまった場合、Excelの起動時に以下のエラーメッセージが表示されます。  
この場合、「Excelのオプション」→「アドイン」→「設定」から、「ExcelIncrementalSearch」のチェックボックスを外してください。削除するかどうかのダイアログが表示された場合、「はい」を選択してください。
>'～\ExcelIncrementalSearch.xla'が見つかりません。  
>ファイル名およびファイルの保存場所が正しいかどうかを確認してください。  
>最近使用したファイルの一覧からファイルを開こうとしている場合は、
>そのファイルの名前が変更されていないこと、移動または削除されていないことを確認してください。

##その他

画面を開いたときのキーワードを、URLのハッシュで指定できます。  
ほかの人に「表のこの部分を見て」と伝えるときにご利用ください。

    ex. http://localhost/search.html#ライセンス  
    ⇒ 「ライセンス」で検索した状態でページを表示

##謝辞
このプログラムでは、以下の MIT License のライブラリを使用しています。
- [jQuery](http://jquery.com/)
- [jQuery quicksearch plug-in](https://github.com/riklomas/quicksearch#readme)
- [highlight: JavaScript text higlighting jQuery plugin](http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html)

##ライセンス

本ソフトウェアは MIT License です。

##バージョン履歴

###Ver 2.0.13 - 2017/2/10

- 【不具合修正】
  - register.vbs を実行しても再インストールできない問題を修正

###Ver 2.0.12 - 2017/2/9

- 【機能追加】
  - 検索ヒット行数を表示するようにした （Special Thanks - MORIO 様）
- 【不具合修正】
  - 大きな表の場合、検索中にフリーズしてしまう問題を修正

###Ver 2.0.11 - 2014/6/16

- 【不具合修正】
 - IE11で、ハイライトされた文字やその前後の文字が消えてしまう問題を修正
 - 「時計台 時計」のように、キーワードを複数指定したときに同じ文字が複数のキーワードに含まれると、文字が消えてしまう問題を修正

###Ver 2.0.10 - 2012/12/27

- 【不具合修正】
 - 検索キーワードが空のときに、キーワード欄からフォーカスが外れると、勝手にページ上部へスクロールしてしまう問題を修正

###Ver 2.0.9 - 2012/12/16

- 【不具合修正】
 - Excel 2007で、2,147,483,647 以上のセルを選択した状態で実行すると、オーバーフローエラーが発生する問題を修正

###Ver 2.0.8 - 2012/09/18

- 【機能改良】
 - 罫線が設定されている範囲を選択する機能を、より確実に動作するように改良
 - 検索欄のデザインを向上

###Ver 2.0.7 - 2012/09/11

- 【機能追加】
 - セルに罫線が設定されている場合、その罫線が設定されている範囲を選択するようにした
- 【不具合修正】
 - 結合されたセルを選択していた場合、自動で範囲選択をする機能が実行されない問題を修正

###Ver 2.0.6 - 2012/08/18

- 【不具合修正】
 - Excel 2003で、文字の上にアイコンが表示される問題を修正  
 （ツールバーの標準的な表示と同じように、文字の横にアイコンを表示するようにした）

###Ver 2.0.5 - 2012/07/13

- 【機能追加】
 - 範囲選択がされていないときに、自動で適当な範囲を選択する機能を追加
 - 検索欄のデザインを向上

###Ver 2.0.4 - 2012/06/16

- 【機能追加】
 - 検索欄の下に影を追加（一部ブラウザのみ）
- 【不具合修正】
 - あるセルが検索にヒットしたとき、同じ行の画像を含むセルの文字が表示されない不具合を修正

###Ver 2.0.3 - 2012/05/23

- 【不具合修正】
 - GoogleChromeで、まれに罫線が表示されない問題を修正
 - 検索バーの上に画像が重なって表示されてしまう問題を修正

###Ver 2.0.2 - 2012/05/04

- 【不具合修正】
 - 縦方向にセルの結合を行っていると、表が崩れる問題を修正

###Ver 2.0.1 - 2012/04/30

- 【不具合修正】
 - < > & が検索できない問題を修正
 - ファイル名に # が含まれていると、検索バーが表示されない問題を修正
 - Safari でURLハッシュを使った検索ができない問題を修正

###Ver 2.0 - 2012/04/10

- 【再構成】
 - Excelアドインとして書き直し、簡単な操作でHTMLファイルを生成できるようにした

###Ver 1.1 - 2011/10/02

- 【機能追加】
 - 検索キーワードをURLのハッシュ(#～)で指定できるようにした
 - 消去ボタンを削除し、キーワード上に×ボタンを配置した
- 【リファクタリング】
 - 検索処理を4倍ぐらい高速化

###Ver 1.0 - 2011/08/21

- 初版リリース

