<?php

//	коды ответа
//	0 - дефолт
//	1 - успешный выход

$code = 0;

if ($user->is_logged() !== false) {
	session_destroy();
	$code = 1;
}

echo $code;