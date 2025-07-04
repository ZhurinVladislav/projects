<?php

require_once './pages/personal-data/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	$code = clean_string($_POST['items']['code']);

	require_once './classes/FixedBitNotation.php';
	require_once './classes/GoogleAuthenticatorInterface.php';
	require_once './classes/GoogleAuthenticator.php';
	require_once './classes/GoogleQrUrl.php';

	$g = new \Sonata\GoogleAuthenticator\GoogleAuthenticator();

	if ($g->checkCode($user->g_auth_secret, $code)) {

		$update_security = $pdo->prepare('UPDATE users SET g_auth = 1 WHERE id = ? LIMIT 1');
		$update_security->execute(array($user->id));

		$response['status'] = 'ok';
		$response['print'] = '<br><div class="googleauth-item">'.$_txt['google_auth_ready'].'</div>';

	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'error_g_code';
		$response['print'] = $_txt['error_g_code'];
	}

}

echo json_encode($response);