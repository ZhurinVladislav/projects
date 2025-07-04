<?php

if (!in_array($_SERVER['REMOTE_ADDR'], array('185.71.65.92', '185.71.65.189', '149.202.17.210'))) return;

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

if (isset($_POST['m_orderid'])) {
	$idPayment = intval($_POST['m_orderid']);

	$log_file_name = fopen(__DIR__."/logs/replenishments/".$idPayment.".txt", "a");

	if ($log_file_name !== false) {
		fputs ($log_file_name, date('d.m.Y H:i:s',time()).PHP_EOL);
		fputs ($log_file_name, 'Payeer'.PHP_EOL);
		fputs ($log_file_name, print_r($_POST, true));
		fputs ($log_file_name, PHP_EOL);
		fputs ($log_file_name, print_r($_SERVER, true));
		fputs ($log_file_name, PHP_EOL);
	} else {
		die('cannot write file');
	}

	if (isset($_POST['m_operation_id']) && isset($_POST['m_sign'])) {
		$m_key = $settings_payments->get('payeer', 'secret');
		$arHash = array(
			$_POST['m_operation_id'],
			$_POST['m_operation_ps'],
			$_POST['m_operation_date'],
			$_POST['m_operation_pay_date'],
			$_POST['m_shop'],
			$_POST['m_orderid'],
			$_POST['m_amount'],
			$_POST['m_curr'],
			$_POST['m_desc'],
			$_POST['m_status'],
			$m_key
		);
		$sign_hash = strtoupper(hash('sha256', implode(':', $arHash)));

		if ($_POST['m_sign'] == $sign_hash && $_POST['m_status'] == 'success') {
			
			$find_replenishment = $pdo->query('SELECT * FROM replenishments WHERE id = '.$idPayment.' LIMIT 1');
			$row = $find_replenishment->fetch();

			if ($row['id'] && $row['status'] != 1) {

				if ($row['paysystem'] == 'payeer') {

					if ($_POST['m_curr'] != $row['currency']) {
						fputs ($log_file_name, 'error - неправильная валюта');
						fclose($log_file_name);
						exit;
					}

					if (number_format($_POST['m_amount'], 2, '.', '') < number_format($row['amount'], 2, '.', '')) {
						fputs ($log_file_name, 'error - пришло меньше денег, чем в платеже');
						fclose($log_file_name);
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
				echo $_POST['m_orderid'].'|error';
			}
		} else {
			fputs($log_file_name, 'error - не совпадают хеши');
			fclose($log_file_name);
			echo $_POST['m_orderid'].'|error';
		}
	}

}

?>