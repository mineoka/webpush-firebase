  // --------------------------------------------------------------------
  // Firebaseメッセージ送信処理
  // discription: Firebaseのtokenを取得しアプリケーションサーバーへ送信
  //              アプリがフォアグランドの場合のメッセージ受信処理
  // author: k.mineoka
  // date: 2018.6.7
  // --------------------------------------------------------------------

  // ------------------------------------------------
  // Firebaseのtokenを取得しアプリケーションサーバーへ送信
  // ------------------------------------------------
  // Retrieve Firebase Messaging object.
  const messaging = firebase.messaging();

  // VAPID Key
  messaging.usePublicVapidKey('FirebaseのWebPush証明書');

  // token取得処理（onTokenRefreshで新しいトークンが生成されるたびにコールバック）
  messaging.onTokenRefresh(function() {
		// tomen取得
    messaging.getToken().then(function(refreshedToken) {
      console.log('Token refreshed.');
      console.log('token:' + refreshedToken);

			// tokenのサーバー送信フラグ
      setTokenSentToServer(false);

      // tokenをサーバーへ送信
      sendTokenToServer(refreshedToken);

    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      // showToken('Unable to retrieve refreshed token ', err);
    });
  });

  function resetUI() {
		// token取得処理
    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
      	console.log('token:' + currentToken);
				// tokenをサーバーへ送信
        sendTokenToServer(currentToken);
      } else {
        // permisionのリクエスト.
        console.log('No Instance ID token available. Request permission to generate one.');

        // permisionのリクエスト.
        requestPermission();
        setTokenSentToServer(false);
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
      setTokenSentToServer(false);
    });
  }

  // アプリケーションサーバーにtokenを送信
  function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...');

      // token情報をサーバーへpost
			$.post('./db_t_fbs.php',{token:currentToken},
				function(data){
					// some actions if needed.
				});

      setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }
  }

  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }

  function requestPermission() {
    console.log('Requesting permission...');

		// permissionの許可確認
    messaging.requestPermission().then(function() {
      // permissionを許可
      console.log('Notification permission granted.');
      resetUI();
    }).catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
  }

	// sessionにtokenが含まれていない場合のみ実行
  resetUI();

  // ------------------------------------------------
  // アプリがフォアグランドの場合のメッセージ受信処理
  // ------------------------------------------------
  // メッセージ受信
  messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);

    // メッセージ内容を編集
    var notificationTitle = payload.data.title;
    var notificationOptions = {
      body: payload.data.body,
      icon: '/img/logo.png'
    };

    // push通知表示
    if (!("Notification" in window)) {
        console.log("This browser does not support system notifications");
    }
    // 通知許可の確認
    else if (Notification.permission === "granted") {
        // 通知メッセージ作成
        var notification = new Notification(notificationTitle,notificationOptions);
        notification.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open("URL(https://example.com)" , '_blank'); // TODO URL変更
            notification.close();
        }
    }
  });
