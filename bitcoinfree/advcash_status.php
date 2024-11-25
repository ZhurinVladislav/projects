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

$ac_src_wallet = $_POST["ac_src_wallet"];
$ac_dest_wallet = $_POST["ac_dest_wallet"];
$ac_amount = $_POST["ac_amount"];
$ac_merchant_amount = $_POST["ac_merchant_amount"];
$ac_merchant_currency = $_POST["ac_merchant_currency"];
$ac_fee = $_POST["ac_fee"];
$ac_buyer_amount_without_commission = $_POST["ac_buyer_amount_without_commission"];
$ac_buyer_amount_with_commission = $_POST["ac_buyer_amount_with_commission"];
$ac_buyer_currency = $_POST["ac_buyer_currency"];
$ac_transfer = $_POST["ac_transfer"];
$ac_sci_name = $_POST["ac_sci_name"];
$ac_start_date = $_POST["ac_start_date"];
$ac_order_id = $_POST["ac_order_id"];
$ac_ps = $_POST["ac_ps"];
$ac_transaction_status = $_POST["ac_transaction_status"];
$ac_buyer_email = $_POST["ac_buyer_email"];
$ac_buyer_verified = $_POST["ac_buyer_verified"];
$ac_comments = $_POST["ac_comments"];
$ac_hash = $_POST["ac_hash"];
$operation_id = $_POST["operation_id"];
$login = $_POST["login"];

$accountEmail = $settings_payments->get('advcash', 'email');
$merchantName = $settings_payments->get('advcash', 'sciname');
$merchantPassword = $settings_payments->get('advcash', 'scipass');

$idPayment = intval($ac_order_id);

$log_file_name = fopen(__DIR__."/logs/replenishments/".$idPayment.".txt", "a");

if ($log_file_name !== false) {
	fputs ($log_file_name, date('d.m.Y H:i:s',time()).PHP_EOL);
	fputs ($log_file_name, 'advcash'.PHP_EOL);
	fputs ($log_file_name, print_r($_POST, true));
	fputs ($log_file_name, PHP_EOL);
	fputs ($log_file_name, print_r($_SERVER, true));
	fputs ($log_file_name, PHP_EOL);
} else {
	die('cannot write file');
}

if (isset($ac_order_id) && isset($ac_hash) && $ac_transaction_status == 'COMPLETED') {
	$arHash = array($ac_transfer,
		$ac_start_date,
		$ac_sci_name,
		$ac_src_wallet,
		$ac_dest_wallet,
		$ac_order_id,
		$ac_amount,
		$ac_merchant_currency,
		$merchantPassword,
	);
	$sign_hash = hash('sha256', implode(':', $arHash));

	if ($ac_hash == $sign_hash) {
		
		$find_replenishment = $pdo->query('SELECT * FROM replenishments WHERE id = '.$idPayment.' LIMIT 1');
		$row = $find_replenishment->fetch();

		if ($row['id'] && $row['status'] != 1) {
			if ($row['paysystem'] == 'advcash') {
				$curr = $ac_merchant_currency;
				if ($curr == 'RUR') {
					$curr = 'RUB';
				}
				
				if ($curr != $row['currency']) {
					fputs ($log_file_name, 'error - неправильная валюта');
					fclose($log_file_name);
					echo $ac_order_id . "|error";
					exit;
				}
				
				if ($ac_amount < $row['amount']) {
					fputs ($log_file_name, 'error - пришло меньше денег, чем в платеже');
					fclose($log_file_name);
					echo $ac_order_id . "|error";
					exit;
				}

				require_once './functions/payments.php';

				payments_mark_payed($idPayment);

				echo $idPayment . '|success';
				fputs ($log_file_name, 'success');
				fclose ($log_file_name);
				header('Location: '.$root_url.'/home');
			} else {
				fputs($log_file_name,"ERROR | Не та платежка");
				fclose ($log_file_name);
			}
		} else {
			fputs($log_file_name, 'Нет записи в БД или повтор операции');
			fclose($log_file_name);
			echo $ac_order_id . "|error";
		}

		echo $ac_order_id . "|success";
		exit();
	} else {
		fputs($log_file_name, 'error - не совпадают хеши');
		fclose($log_file_name);
		echo $ac_order_id . "|error";
	}
}