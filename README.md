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

### /js/firebase/app.js
16行目 FirebaseのWebPush証明書
```
// VAPID Key
messaging.usePublicVapidKey('FirebaseのWebPush証明書');
```
124行目 クリック時のURL変更
```
notification.onclick = function(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    window.open("URL(https://example.com)" , '_blank'); // TODO URL変更
    notification.close();
}
```

### /firebase-messaging-sw.js
17行目 クリック時のURL
```
// 通知メッセージのカスタマイズ
var notificationTitle = payload.data.title;
var notificationOptions = {
  body: payload.data.body,
  icon: '/img/logo.png',
  url: 'URL(htttps://example.com)'  // TODO URLを変更
};
```

### /manifest.json
2、3行目 nameとshort nameを変更
```
"name"              : "SERVICE NAME",
"short_name"        : "SERVICE NAME",
```

### /send_notify.php
12行目〜14行目の定数値
```
define( 'CONST_FIREBASE_SERVER_KEY' , 'Firebase Server Key' );	// Firebaseのクラウドメッセージ内にあるサーバーキー
define( 'CONST_NOTIFICATION_TITLE'  , '通知メッセージタイトル' );
define( 'CONST_NOTIFICATION_BODY'   , '通知メッセージ本文' );
```

24行目の送信先tokenをDBより取得
```
// TODO db_t_fbs.phpにて保存したテーブルを参照し、送信可能なtokenを取得
$ary_firebase_token = array(
  'tokenId00001',
  'tokenId00002',
  'tokenId00003'
);
```


