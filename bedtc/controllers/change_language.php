<?php

//	коды ответа
//	0 - дефолт
//	1 - успешная смена языка
//	2 - язык не поддерживается

$code = 0;

//	$languages заполняется в конфиге в корне сайта
if (in_array($_POST['language'], $languages)) {

	$code = 1;

	if ($user->is_logged()) {
		$find_user = $pdo->prepare('UPDATE users SET language = ? WHERE login LIKE ?');
		$find_user->execute(array($_POST['language'], '%'.$user->login.'%'));
	}

	$user->language = $_POST['language'];

	$_SESSION['language'] = $_POST['language'];

} else {
	$code = 2;
}

echo $code;