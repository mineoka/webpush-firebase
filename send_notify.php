<?PHP
//********************************************************************
//* File name	send_notify.php
	define( 'CONST_TITLE' , 'Firebase Send Notify' );
//*
//* Code author	K.mineoka<mineoka0222@gmail.com>
//* History		2018/06/02	create
//********************************************************************
	//----------------------------------------------------------------
	// プログラム定数
	//----------------------------------------------------------------
	define( 'CONST_FIREBASE_SERVER_KEY' , 'Firebase Server Key' );	// Firebaseのクラウドメッセージ内にあるサーバーキー
	define( 'CONST_NOTIFICATION_TITLE'  , '通知メッセージタイトル' );
	define( 'CONST_NOTIFICATION_BODY'   , '通知メッセージ本文' );

	//----------------------------------------------------------------
	// FCMへプッシュ通知内容を送信
	//----------------------------------------------------------------
	// 初期処理
	$api_key  = CONST_FIREBASE_SERVER_KEY;
	$base_url = "https://fcm.googleapis.com/fcm/send";

	// 送信先token
	$ary_firebase_token = array(
		'tokenId00001',
		'tokenId00002',
		'tokenId00003'
	);

	// header情報
	$header = array(
	     "Content-Type:application/json"
	    ,"Authorization:key=".$api_key
	);

	// HTTP POSTを送信件数分処理
	foreach ( $ary_firebase_token as $idx => $val ){
		// 送信データ
		$data = array(
		     "to" => $val
		    ,"data" => array(
	         "title" => CONST_NOTIFICATION_TITLE
	        ,"body"  => CONST_NOTIFICATION_BODY
		    )
		);

		$context = stream_context_create(array(
		    "http" => array(
		         'method' => 'POST'
		        ,'header' => implode("\r\n",$header)
		        ,'content'=> json_encode($data)
		    )
		));
		file_get_contents($base_url, false, $context);
	}
?>
