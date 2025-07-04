<?php

require_once './pages/paysystems/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {
	if (isset($_POST['items']['wallet_qiwi'])) {
		$wallet_qiwi = clean_string($_POST['items']['wallet_qiwi']);
	} else {
		$wallet_qiwi = '';
	}
	if (isset($_POST['items']['wallet_payeer'])) {
		$wallet_payeer = clean_string($_POST['items']['wallet_payeer']);
	} else {
		$wallet_payeer = '';
	}
	if (isset($_POST['items']['wallet_pm'])) {
		$wallet_pm = clean_string($_POST['items']['wallet_pm']);
	} else {
		$wallet_pm = '';
	}
	if (isset($_POST['items']['wallet_advcash'])) {
		$wallet_advcash = clean_string($_POST['items']['wallet_advcash']);
	} else {
		$wallet_advcash = '';
	}
	if (isset($_POST['items']['wallet_bitcoin'])) {
		$wallet_bitcoin = clean_string($_POST['items']['wallet_bitcoin']);
	} else {
		$wallet_bitcoin = '';
	}

	$change_settings = $pdo->prepare('UPDATE users_wallets SET qiwi = ?, payeer = ?, perfectmoney = ?, advcash = ?, bitcoin = ? WHERE user_id = ? LIMIT 1');
	if ($change_settings->execute(array($wallet_qiwi, $wallet_payeer, $wallet_pm, $wallet_advcash, $wallet_bitcoin, $user->id))) {
		$response['status'] = 'ok';
	} else {
		$response['status'] = 2;
	}
}

echo json_encode($response);