// Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');
importScripts('/js/firebase/init.js');

var messaging = firebase.messaging();

// アプリがバックグラウンド、または起動していない場合のpush通知受信処理
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // 通知メッセージのカスタマイズ
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: '/img/logo.png',
    url: 'URL(htttps://example.com)'  // TODO URLを変更
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 通知メッセージをクリックした場合の処理
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow( "URL(htttps://example.com)" ));  // TODO URLを変更
});
