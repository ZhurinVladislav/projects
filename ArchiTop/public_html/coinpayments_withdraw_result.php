<?php

define('ENGINE', true);

//	подключаем конфиг и коннектимся к базе
require_once dirname(__FILE__).'/config.php';
global $pdo;
require_once dirname(__FILE__).'/database.php';

//	подключаем дефолтные функции и классы
require_once dirname(__FILE__).'/classes/settings.php';
global $settings, $settings_payments;

$settings = new settings();
$settings_payments = new settings_payments();

require_once './functions/default.php';

$merchant_id = $settings_payments->get('coinpayments', 'merchantid');
$secret = $settings_payments->get('coinpayments', 'ipnsecret');

//	записываем данные в файл для дебага
$st = 'GET: ' . PHP_EOL . print_r($_GET, true) . PHP_EOL . 'POST: ' . PHP_EOL . print_r($_POST, true);

file_put_contents('coinpayments_tmp.txt', $st);


//	ищем id платежа в системе по id платежа в coinpayments
$search_withdrawal = $pdo->query('SELECT * FROM bitcoin_withdraw WHERE received_id LIKE "'.$_POST['id'].'" LIMIT 1');
if (!is_bool($withdrawal = $search_withdrawal->fetch())) {

	$withdrawal_id = $withdrawal['withdraw_id'];

	if ($_POST['status'] == 2) {
		
		require_once './functions/payments.php';
		payments_set_status($withdrawal_id, 1, 'withdrawal');
		// $pdo->query('UPDATE withdrawal SET status = 1 WHERE id = '.$withdrawal_id.' LIMIT 1');
	}
}

?>