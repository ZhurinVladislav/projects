<?php

define('ENGINE', true);

if (empty($_POST['invoice'])) {
	die('No id sent');
}

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

//	id платежа в нашей игре
$idPayment = intval($_POST['invoice']);

//	логи
$log_file_name = fopen(__DIR__."/logs/replenishments/".$idPayment.".txt", "a");

if ($log_file_name !== false) {
	fputs ($log_file_name, date('d.m.Y H:i:s',time()).PHP_EOL);
	fputs ($log_file_name, 'CoinPayments'.PHP_EOL);
	fputs ($log_file_name, print_r($_POST, true));
	fputs ($log_file_name, PHP_EOL);
	fputs ($log_file_name, print_r($_SERVER, true));
	fputs ($log_file_name, PHP_EOL);

	// fclose ($log_file_name);
}

//	стандартные проверки платежки
if (!isset($_SERVER['HTTP_HMAC']) || empty($_SERVER['HTTP_HMAC'])) {
	fputs ($log_file_name, 'No HMAC signature sent'.PHP_EOL);
	fclose ($log_file_name);
	die("No HMAC signature sent");
}

$merchant = isset($_POST['merchant']) ? $_POST['merchant']:'';
if (empty($merchant)) {
	fputs ($log_file_name, 'No Merchant ID passed'.PHP_EOL);
	fclose ($log_file_name);
	die("No Merchant ID passed");
}

if ($merchant != $merchant_id) {
	fputs ($log_file_name, 'Invalid Merchant ID'.PHP_EOL);
	fclose ($log_file_name);
	die("Invalid Merchant ID");
}

$request = file_get_contents('php://input');
if ($request === FALSE || empty($request)) {
	fputs ($log_file_name, 'Error reading POST data'.PHP_EOL);
	fclose ($log_file_name);
	die("Error reading POST data");
}

$hmac = hash_hmac("sha512", $request, $secret);
if ($hmac != $_SERVER['HTTP_HMAC']) {
	fputs ($log_file_name, 'HMAC signature does not match'.PHP_EOL);
	fclose ($log_file_name);
	die("HMAC signature does not match");
}


//	если оплата прошла
if ($_POST['status'] == 100) {
	$find_replenishment = $pdo->query('SELECT * FROM replenishments WHERE id = '.$idPayment.' LIMIT 1');
	$row = $find_replenishment->fetch();

	if ($row['id'] && $row['status'] != 1) {

		if ($row['paysystem'] == 'coinpayments') {

			require_once './functions/payments.php';

			payments_mark_payed($idPayment);

			echo $idPayment . "|success";
			fputs ($log_file_name, 'success');
			fclose ($log_file_name);
			header('Location: '.$root_url.'/home');

		} else {
			fputs($log_file_name,"ERROR | Не та платежка");
			fclose ($log_file_name);
		}
	} else {
		echo $idPayment . "|error";
		fputs ($log_file_name, 'error - Нет записи в БД или повтор операции!');
		fclose ($log_file_name);
	}

	exit();
} else {
	fputs ($log_file_name, 'wait for complete transaction');
	fclose ($log_file_name);
}
?>