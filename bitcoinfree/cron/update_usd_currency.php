<?php

define('ENGINE', true);

//	данный скрипт обновляет курс доллара в системе
//	рекомендуется запускать по крону каждые 6-12 часов

//	подключаем конфиг и коннектимся к базе
require_once dirname(dirname(__FILE__)).'/config.php';
global $pdo;
require_once dirname(dirname(__FILE__)).'/database.php';

//	подключаем дефолтные функции и классы
require_once dirname(dirname(__FILE__)).'/classes/settings.php';
global $settings, $settings_payments;

$settings = new settings();
$settings_payments = new settings_payments();

$file = file_get_contents('https://www.cbr-xml-daily.ru/daily_json.js');
$file = mb_convert_encoding($file, 'UTF-8');
$array = json_decode($file);

if ($settings->update('currency_usd', number_format($array->Valute->USD->Value, 2, '.', '')) === true) {
	echo 'курс доллара успешно обновлён';
} else {
	echo 'при обновлении курса доллара возникла ошибка';
}