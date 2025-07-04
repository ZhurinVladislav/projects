<?php

$response['status'] = 0;

if ($user->is_logged() == true) {
	$ref_type = (int) $_POST['items']['auto_ref_back'];

	if ($ref_type == '0' ||  $ref_type == '25' || $ref_type == '50' || $ref_type == '75') {
		$change_settings = $pdo->prepare('UPDATE referrals_info SET auto_ref_back = ? WHERE user_id = ? LIMIT 1');
		if ($change_settings->execute(array($ref_type, $user->id))) {
			$response['status'] = 'ok';
		}
	} else {
		$response['status'] = 2;
	}
}

echo json_encode($response);