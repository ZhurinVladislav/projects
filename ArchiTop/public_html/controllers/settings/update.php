<?php

require_once './pages/settings/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {
	$wallet_qiwi = clean_string($_POST['items']['wallet_qiwi']);
	$wallet_payeer = clean_string($_POST['items']['wallet_payeer']);
	$wallet_pm = clean_string($_POST['items']['wallet_pm']);
	$wallet_advcash = clean_string($_POST['items']['wallet_advcash']);
	$wallet_bitcoin = clean_string($_POST['items']['wallet_btc']);

	$pin = (int) $_POST['items']['pin'];

	$pass_string = '';
	if ($_POST['items']['user_pass'] != '') {
		$new_password = hash('sha256', trim($_POST['items']['user_pass']));
		$new_password = hash('sha256', ($new_password . $pass_salt));
		$pass_string = 'password = "'.$new_password.'",';
	}

	if ($pin === $user->pin) {

		$change_settings = $pdo->prepare('UPDATE users_wallets SET qiwi = ?, payeer = ?, perfectmoney = ?, advcash = ?, btc = ? WHERE user_id = ? LIMIT 1');
		if ($change_settings->execute(array($wallet_qiwi, $wallet_payeer, $wallet_pm, $wallet_advcash, $wallet_bitcoin, $user->id))) {

			if ($pass_string !== '') {
				if ($_POST['items']['user_pass'] == $_POST['items']['user_pass_confirm']) {
					$change_pass = $pdo->prepare('UPDATE users SET password = ? WHERE id = ? LIMIT 1');
					if ($change_pass->execute(array($new_password, $user->id))) {
						$response['status'] = 'ok';
					} else {
						$response['status'] = 2;
					}
				} else {
					$response['status'] = 'error';
					$response['placeholder'] = 'error_passwords';
					$response['print'] = $_txt['error_passwords'];
				}
			} else {
				$response['status'] = 'ok';
			}

		} else {
			$response['status'] = 2;
		}
	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'error_pin';
		$response['print'] = $_txt['error_pin'];
	}
}

echo json_encode($response);