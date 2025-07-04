<?php

$response['status'] = 0;

if ($user->is_logged() == true) {
	// $change_settings = $pdo->prepare('UPDATE users_wallets SET qiwi = ?, payeer = ?, pm = ? WHERE user_id = ? LIMIT 1');
	// if ($change_settings->execute(array($wallet_qiwi, $wallet_payeer, $wallet_pm, $user->id))) {
	// 	$response['status'] = 'ok';
	// } else {
	// 	$response['status'] = 2;
	// }

	require_once './classes/simpleimage.php';
	
	$file_types = array('jpg', 'JPG', 'jpeg', 'gif', 'GIF', 'png', 'PNG');

	$file_mime_types = array('image/gif','image/jpeg','image/pjpeg','image/png');
		
	$img_info = getimagesize($_FILES['file']['tmp_name']);

	$img_name_exp = explode('.', $_FILES['file']['name']);

	$img_tmp_count = count($img_name_exp) - 1;
	$img_type = $img_name_exp[$img_tmp_count];

	if ($_FILES['file']['size'] < 3000000) {

		if (in_array($img_info['mime'], $file_mime_types)) {

			if (in_array($img_type, $file_types)) {

				//	если у пользователя ранее был загружен аватар -удаляем его
				if ($user->avatar != 'default') {
					unlink($_SERVER['DOCUMENT_ROOT'].'/images/avatars/'.$user->avatar);
				}

				$new_name = $user->id.'.'.$img_type;

				$path_to_new_image = $_SERVER['DOCUMENT_ROOT'].'/images/avatars/'.$new_name;

				move_uploaded_file($_FILES['file']['tmp_name'], $path_to_new_image);

				if ($img_type != 'gif') {
					$image = new SimpleImage();

					$image->load($path_to_new_image);

					$image->resizeToWidth(200);

					$image->save($_SERVER['DOCUMENT_ROOT'].'/images/avatars/'.$new_name);
				}

				$change_settings = $pdo->prepare('UPDATE users SET avatar = ? WHERE id = ? LIMIT 1');
				$change_settings->execute(array($img_type, $user->id));

				$response['status'] = 'ok';
			} else {
				$response['status'] = 'fail';
				$response['error'] = 'type';
			}
		} else {
			$response['status'] = 'fail';
			$response['error'] = 'type';
		}
	} else {
		$response['status'] = 'fail';
		$response['error'] = 'size';
	}
}

echo json_encode($response);