<?php

//	!!!!!
//	данный файл используется только для загрузки картинок в новости
//	!!!!!

define('ENGINE', true);

require '../config.php';
global $pdo;
require '../database.php';

function show_404()
{
	header('HTTP/1.0 404 Not Found');
	header('Accept-Ranges: bytes');
	header('Connection: Keep-Alive');
	header('Keep-Alive: timeout=5, max=100');
	header('ETag: "2b6-5644af9bfb000"');
	header('Last-Modified: Sat, 03 Feb 2018 08:54:24 GMT');
	header_remove('X-Powered-By');
	// readfile('../errors/404.html');
	echo 'access denied';
	die;
}

if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
	show_404();
}

if (!isset($_SESSION['admin_logged'])) {
	show_404();
} else {
	$file_types = array('jpg', 'JPG', 'jpeg', 'gif', 'GIF', 'png', 'PNG');

	$file_mime_types = array('image/gif', 'image/jpeg', 'image/pjpeg', 'image/png');

	$img_info = getimagesize($_FILES['file']['tmp_name']);

	$img_name_exp = explode('.', $_FILES['file']['name']);

	$img_tmp_count = count($img_name_exp) - 1;
	$img_type = $img_name_exp[$img_tmp_count];

	$id = (int) $_POST['id'];

	if (in_array($img_info['mime'], $file_mime_types) && in_array($img_type, $file_types)) {

		$filename = 'news' . $id . '.' . $img_type;
		$savepath = '../' . $_POST['path'] . '/' . $filename;

		if (copy($_FILES['file']['tmp_name'], $savepath)) {
			$update_image = $pdo->prepare('UPDATE news SET image = ? WHERE id = ? LIMIT 1');
			$update_image->execute(array($filename, $id));
			echo '1';
		} else {
			echo 'copy';
		}
	} else {
		echo 'type';
	}
}
