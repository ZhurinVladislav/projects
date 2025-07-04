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


$idPayment = intval($_POST['PAYMENT_ID']);


$log_file_name = fopen(__DIR__."/logs/replenishments/".$idPayment.".txt", "a");

if ($log_file_name !== false) {
	fputs ($log_file_name, date('d.m.Y H:i:s',time()).PHP_EOL);
	fputs ($log_file_name, 'PerfectMoney'.PHP_EOL);
	fputs ($log_file_name, print_r($_POST, true));
	fputs ($log_file_name, PHP_EOL);
	fputs ($log_file_name, print_r($_SERVER, true));
	fputs ($log_file_name, PHP_EOL);
} else {
	die('cannot write file');
}


$string = $_POST['PAYMENT_ID'].':'.$_POST['PAYEE_ACCOUNT'].':'.$_POST['PAYMENT_AMOUNT'].':'.$_POST['PAYMENT_UNITS'].':'.$_POST['PAYMENT_BATCH_NUM'].':'.$_POST['PAYER_ACCOUNT'].':'.strtoupper(md5($settings_payments->get('perfectmoney', 'altphrase'))).':'.$_POST['TIMESTAMPGMT'];

$hash = strtoupper(md5($string));

if ($hash == $_POST['V2_HASH']) {

	$find_replenishment = $pdo->query('SELECT * FROM replenishments WHERE id = '.$idPayment.' LIMIT 1');
	$row = $find_replenishment->fetch();

	if ($row['id'] && $row['status'] != 1) {
		if ($row['paysystem'] == 'perfectmoney') {
			if (sprintf("%01.2f", $_POST['PAYMENT_AMOUNT']) == $row['amount']
				&& $_POST['PAYEE_ACCOUNT'] == $settings_payments->get('perfectmoney', 'account')
				&& $_POST['PAYMENT_UNITS'] == 'USD') {
				
				require_once './functions/payments.php';
			
				payments_mark_payed($idPayment);

				echo $idPayment . "|success";
				fputs ($log_file_name, 'success');
				fclose ($log_file_name);
				header('Location: '.$root_url.'/home');

			} else {
				fputs($log_file_name,"ERROR | Не те данные");
				fclose($log_file_name);
			}
		} else {
			fputs($log_file_name,"ERROR | Не та платежка");
			fclose ($log_file_name);
		}
	} else {
		fputs($log_file_name,"ERROR | Нет записи в БД или ...");
		fclose ($log_file_name);
	}
} else {
	fputs($log_file_name,"ERROR | Не прошёл хеш");
	fclose ($log_file_name);
}

?>