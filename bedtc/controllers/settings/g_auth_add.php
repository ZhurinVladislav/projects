<?php

require_once './pages/personal-data/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	$get_email = clean_string($_POST['items']['email']);

	if (stristr($get_email, '@gmail.com')) {

		if ($user->g_auth == 0) {

			require_once './classes/FixedBitNotation.php';
			require_once './classes/GoogleAuthenticatorInterface.php';
			require_once './classes/GoogleAuthenticator.php';
			require_once './classes/GoogleQrUrl.php';

			$g = new \Sonata\GoogleAuthenticator\GoogleAuthenticator();
			$secret = $g->generateSecret();

			$update_security = $pdo->prepare('UPDATE users SET g_auth_secret = ? WHERE id = ? LIMIT 1');
			$update_security->execute(array($secret, $user->id));

			$response['status'] = 'ok';
			$response['print'] = '
				<img src="'.\Sonata\GoogleAuthenticator\GoogleQrUrl::generate($get_email, $secret, $site_name).'">
				<div>Secret: '.$secret.'</div>
			';
		}
	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'error_email';
		$response['print'] = $_txt['error_email'];
	}

}

echo json_encode($response);