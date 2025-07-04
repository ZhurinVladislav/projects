<?php

use Config;

require_once $_SERVER['DOCUMENT_ROOT'] . '/config/Config.php';

$dsn = 'mysql:host=' . Config::DB_HOST . ';dbname=' . Config::DB_DATABASE . ';charset=utf8';
$opt = [
	PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
	PDO::ATTR_EMULATE_PREPARES		=> FALSE
];

$pdo = new PDO($dsn, Config::DB_USERNAME, Config::DB_PASSWORD, $opt);
