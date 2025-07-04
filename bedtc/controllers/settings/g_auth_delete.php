<?php

require_once './pages/personal-data/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	// $code = clean_string($_POST['items']['code']);

	// require_once './classes/FixedBitNotation.php';
	// require_once './classes/GoogleAuthenticatorInterface.php';
	// require_once './classes/GoogleAuthenticator.php';
	// require_once './classes/GoogleQrUrl.php';

	// $g = new \Sonata\GoogleAuthenticator\GoogleAuthenticator();

	// if ($g->checkCode($user->g_auth_secret, $code)) {

	global $pass_salt;

	$password = hash('sha256', trim($_POST['items']['password']));
	$password = hash('sha256', ($password . $pass_salt));

	$select_user_password = $pdo->prepare('SELECT password FROM users WHERE id LIKE ? LIMIT 1');
	$select_user_password->execute(array($user->id));
	$user_password = $select_user_password->fetch();

	if ($password == $user_password['password']) {

		$update_security = $pdo->prepare('UPDATE users SET g_auth = 0, g_auth_secret = "" WHERE id = ? LIMIT 1');
		$update_security->execute(array($user->id));

		$response['status'] = 'ok';
		$response['print'] = '
			<div class="g_auth__header">'.$_txt['google_auth_deleted'].'</div>
		';
	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'error_g_password';
		$response['print'] = $_txt['error_g_password'];
	}

	// } else {
	// 	$response['status'] = 'error';
	// 	$response['placeholder'] = 'error_g_code';
	// 	$response['print'] = $_txt['error_g_code'];
	// }

}

echo json_encode($response);