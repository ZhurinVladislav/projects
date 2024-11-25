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


//	id платежа в нашей игре
if (isset($_POST['label']) && $_POST['label'] != '') {
	$idPayment = intval($_POST['label']);
} else {
	$idPayment = '99999';
}

$secret = $settings_payments->get('yandex', 'secret');

//	логи
$log_file_name = fopen(__DIR__."/logs/replenishments/".$idPayment.".txt", "a");

if ($log_file_name !== false) {
	fputs ($log_file_name, date('d.m.Y H:i:s',time()).PHP_EOL);
	fputs ($log_file_name, 'YandexMoney'.PHP_EOL);
	fputs ($log_file_name, print_r($_POST, true));
	fputs ($log_file_name, PHP_EOL);
	fputs ($log_file_name, print_r($_SERVER, true));
	fputs ($log_file_name, PHP_EOL);
} else {
	die('cannot write file');
}


$hash = '';
$hash .= $_POST['notification_type'];
$hash .= '&' . $_POST['operation_id'];
$hash .= '&' . $_POST['amount'];
$hash .= '&' . $_POST['currency'];
$hash .= '&' . $_POST['datetime'];
$hash .= '&' . $_POST['sender'];
$hash .= '&' . $_POST['codepro'];
$hash .= '&' . $secret;
$hash .= '&' . $_POST['label'];

$hash_before = $hash;
$hash = sha1($hash);

$get_hash = $_POST['sha1_hash'];

if ($hash != $get_hash) {
	$hash_string = 'String hash: ' . $hash_before;
	$hash_computed_string = 'Computed hash: ' . $hash;
	$get_hash_string = 'Get hash: ' . $get_hash;
	fputs ($log_file_name, 'Wrong hash');
	fputs ($log_file_name, PHP_EOL);
	fputs ($log_file_name, $hash_string);
	fputs ($log_file_name, PHP_EOL);
	fputs ($log_file_name, $hash_computed_string);
	fputs ($log_file_name, PHP_EOL);
	fputs ($log_file_name, $get_hash_string);
	fputs ($log_file_name, PHP_EOL);
	fclose ($log_file_name);
	die('Wrong hash');
}

$find_replenishment = $pdo->query('SELECT * FROM replenishments WHERE id = '.$idPayment.' LIMIT 1');
$row = $find_replenishment->fetch();

if ($row['id'] && $row['status'] != 1) {
	if ($row['paysystem'] == 'yandex') {
		if ($row['amount'] == $_POST['amount']) {
			require_once './functions/payments.php';

			payments_mark_payed($idPayment);

			echo $idPayment . "|success";
			fputs ($log_file_name, 'success');
			fclose ($log_file_name);
			header('Location: '.$root_url.'/home');
		}
	} else {
		fputs($log_file_name,"ERROR | Не та платежка");
		fclose ($log_file_name);
	}
} else {
	echo $idPayment . "|error - нет платежа в БД";
	fputs ($log_file_name, 'error - нет платежа в БД');
	fclose ($log_file_name);
}

exit();

?>