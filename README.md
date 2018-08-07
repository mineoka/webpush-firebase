# webpush-firebase
## 前提条件
- Firebaseを利用したWebPushプログラム。
- 通知メッセージの送信は、PHPを利用しています。

## ディレクトリ構成
```
リポジトリTOP
│
├ img
│　├ logo.png .. PUSH通知のアイコン画像
│
├ js
│　├ firebase
│　　├ app.js .. Firebaseからtoken取得。アプリフォアグランド時のPUSH通知
│　　├ init.js .. Firebaseの初期化
│
├ index.html .. /js/firebase/app.jsを起動し、Serviceworkerの登録、token取得を行う
├ manifest.json .. マニフェストファイル
├ firebase-messaging-sw.js .. ServiceWorker。アプリがバックグランド時のPUSH通知処理
├ db_t_fbs.php .. tokenをDBへ保存する処理
├ send_notify.php .. メッセージ送信プログラム
```
## 動作概要
- /js/firebase/app.jsにてServiceWorkerの登録、Firebaseからのtokenを取得
- db_t_fbs.phpにてtokenをDB保存
- send_notify.phpにてFirebaseへメッセージ送信
- アプリがバックグラウンドの場合は、firebase-messaging-sw.jsにてPUSH通知
- アプリがフォアグランドの場合は、app.jsにてPUSH通知

## 編集箇所
### /js/firebase/init.js
```
var config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId"
};
```
