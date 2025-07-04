<?php

define('ENGINE', true);

//	подключаем конфиг и коннектимся к базе
require_once dirname(dirname(__FILE__)).'/config.php';
global $pdo;
require_once dirname(dirname(__FILE__)).'/database.php';

//	подключаем дефолтные функции и классы
require_once dirname(dirname(__FILE__)).'/classes/settings.php';
global $settings, $settings_payments;

$settings = new settings();
$settings_payments = new settings_payments();

//	данный запрос собирает сумму всех пополнений и записывает их в таблицу статистики
$update_replenishments_sum = $pdo->query('
	UPDATE project_statistics SET project_statistics.value =
	(SELECT SUM(replenishments.amount_get) FROM replenishments WHERE replenishments.status = 1)
	WHERE name LIKE "replenishments_total";');

if ($update_replenishments_sum !== false) {
	echo 'Сумма пополнений успешно обновлена<br>';
	file_put_contents(dirname(__FILE__).'/temp/stat.txt', 'Сумма пополнений успешно обновлена');
} else {
	echo 'При обновлении суммы пополнений произошла ошибка<br>';
}

//	данный запрос собирает сумму всех выводов и записывает их в таблицу статистики
$update_withdrawal_sum = $pdo->query('
	UPDATE project_statistics SET project_statistics.value =
	(SELECT SUM(withdrawal.amount) FROM withdrawal WHERE withdrawal.status = 1)
	WHERE name LIKE "withdrawal_total";');

if ($update_withdrawal_sum !== false) {
	echo 'Сумма выводов успешно обновлена<br>';
} else {
	echo 'При обновлении суммы выводов произошла ошибка<br>';
}

$update_houses_buyed = $pdo->query('
	UPDATE project_statistics SET project_statistics.value =
	(SELECT COUNT(DISTINCT user_id) FROM users_houses)
	WHERE name LIKE "houses_buyed";');

if ($update_admin_tariff_opened !== false) {
	echo 'Количество купивших жильё успешно обновлено<br>';
} else {
	echo 'При обновлении количества купивших жильё произошла ошибка<br>';
}

$update_work_buyed = $pdo->query('
	UPDATE project_statistics SET project_statistics.value =
	(SELECT COUNT(DISTINCT user_id) FROM deposits)
	WHERE name LIKE "work_buyed";');

if ($update_admin_tariff_opened !== false) {
	echo 'Количество купивших работу успешно обновлено<br>';
} else {
	echo 'При обновлении количества купивших работу произошла ошибка<br>';
}

$update_business_buyed = $pdo->query('
	UPDATE project_statistics SET project_statistics.value =
	(SELECT COUNT(DISTINCT user_id) FROM deposits_business)
	WHERE name LIKE "business_buyed";');

if ($update_admin_tariff_opened !== false) {
	echo 'Количество открывшых бизнес успешно обновлено<br>';
} else {
	echo 'При обновлении количества открывшых бизнес произошла ошибка<br>';
}