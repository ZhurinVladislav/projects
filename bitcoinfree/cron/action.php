<?php 

define('ENGINE', true);

//	подключаем конфиг и коннектимся к базе
require_once dirname(dirname(__FILE__)).'/config.php';
global $pdo, $settings;
require_once dirname(dirname(__FILE__)).'/database.php';

//	подключаем дефолтные функции и классы
require_once dirname(dirname(__FILE__)).'/classes/settings.php';

$settings = new settings();

$action_percent = $settings->get('action_percent');
$action_date_to = $settings->get('action_date_to');

if ($action_date_to <= time()) {
	$settings->update('action_percent', 0);
	$settings->update('action_date_to', ' '); 
}
?>