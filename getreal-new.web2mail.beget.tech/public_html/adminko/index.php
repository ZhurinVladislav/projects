<?php

define('ENGINE', true);

require '../config.php';
global $pdo;
require '../database.php';
require '../classes/settings.php';
global $settings, $settings_payments;
$settings = new settings();
$settings_payments = new settings_payments();

require '../functions/default.php';

require_once '../classes/user.php';
global $user;

$user = new user($languages);


function show_404()
{
	header('HTTP/1.0 404 Not Found');
	header('Accept-Ranges: bytes');
	header('Connection: Keep-Alive');
	header('Keep-Alive: timeout=5, max=100');
	header('ETag: "2b6-5644af9bfb000"');
	header('Last-Modified: Sat, 03 Feb 2018 08:54:24 GMT');
	header_remove('X-Powered-By');
	echo 'access denied';
	die;
}

if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] === false) {
	require 'login.php';
} else {
	if (isset($_POST['page'])) {
		require 'pages/' . $_POST['page'] . '.php';
	} else {
		require 'template.php';
	}
}
