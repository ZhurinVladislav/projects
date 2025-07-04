<?php 

define('ENGINE', true);

//	подключаем конфиг и коннектимся к базе
require_once dirname(__FILE__).'/config.php';
global $pdo, $settings;
require_once dirname(__FILE__).'/database.php';

//	подключаем дефолтные функции и классы
require_once dirname(__FILE__).'/classes/settings.php';

require_once './functions/default.php';

$settings = new settings();

$given_email = clean_string($_GET['email']);
$given_hash = clean_string($_GET['hash']);

$find_email = $pdo->prepare('SELECT id FROM users WHERE email LIKE ? LIMIT 1');
$find_email->execute(array($given_email));

if (!is_bool($finded = $find_email->fetch())) {
	
	$true_hash = md5($given_email.$email_salt);

	if ($given_hash === $true_hash) {
		$pdo->query('UPDATE users SET subscribed = 0 WHERE id = '.$finded['id'].' LIMIT 1');
		header('Location: '.$root_url.'unsubscribed');
	}

}