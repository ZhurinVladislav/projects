<?php

define('ENGINE', true);

//	подключаем конфиг и коннектимся к базе
require_once dirname(dirname(__FILE__)).'/config.php';
global $pdo;
require_once dirname(dirname(__FILE__)).'/database.php';

if ( $directory_handle = opendir( '/var/lib/php/session' ) ) {
	$count = 0;
	while ( false !== ( $file = readdir( $directory_handle ) ) ) {
		if ($file != '.' && $file != '..'){
			if (time() - filemtime('/var/lib/php/session' . '/' . $file) < 900) {
				$count++;
			}
		}
	}
	closedir($directory_handle);

	$get_fake_online = $pdo->query('SELECT value FROM project_statistics WHERE name LIKE "fake_users_online"');
	$fake_online = $get_fake_online->fetch();
	$fake_online = $fake_online['value'];

	$count += $fake_online;


	if (file_put_contents(dirname(dirname(__FILE__)).'/users_online.txt', $count)) {
		echo 'success';
	} else {
		echo 'can not write file';
	}
} else {
	echo 'can not open dir';
}