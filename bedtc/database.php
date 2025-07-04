<?php

$dsn = 'mysql:host='.$dbconfig['host'].';dbname='.$dbconfig['dbname'].';charset=utf8';
$opt = [
	PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
	PDO::ATTR_EMULATE_PREPARES		=> FALSE
];

$pdo = new PDO($dsn, $dbconfig['login'], $dbconfig['pass'], $opt);