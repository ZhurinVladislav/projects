<?php

require_once './pages/security/'.$user->language.'.php';

$response['status'] = 0;

if ($user->is_logged() == true) {

	$pin = (int) $_POST['items']['pin'];

	$old_pass = $_POST['items']['old_pass'];
	$new_pass = $_POST['items']['new_pass'];
	$pass_repeat = $_POST['items']['pass_repeat'];

	$find_old_pass = $pdo->prepare('SELECT password FROM users WHERE id = ? LIMIT 1');
	$find_old_pass->execute(array($user->id));
	$true_old_pass_hash = $find_old_pass->fetch();
	$true_old_pass_hash = $true_old_pass_hash['password'];

	$old_pass_hash = hash('sha256', trim($old_pass));
	$old_pass_hash = hash('sha256', ($old_pass_hash . $pass_salt));

	if ($pin === $user->pin) {
		if ($old_pass_hash === $true_old_pass_hash) {
			if ($new_pass == $pass_repeat) {

				$new_pass_hash = hash('sha256', trim($new_pass));
				$new_pass_hash = hash('sha256', ($new_pass_hash . $pass_salt));

				$change_settings = $pdo->prepare('UPDATE users SET password = ? WHERE id = ? LIMIT 1');
				if ($change_settings->execute(array($new_pass_hash, $user->id))) {
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
			$response['status'] = 'error';
			$response['placeholder'] = 'error_old_pass';
			$response['print'] = $_txt['error_old_pass'];
		}
	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'error_pin';
		$response['print'] = $_txt['error_pin'];
	}
}

echo json_encode($response);