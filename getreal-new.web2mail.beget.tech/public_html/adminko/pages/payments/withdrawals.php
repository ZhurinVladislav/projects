<?php

require_once '../functions/users.php';
require_once '../functions/payments.php';

if ($_POST['action'] == 'set_status') {
	
	//	небольшой костыль
	//	если указано числовое значение - просто меняем статус, если нет - делаем что-то ещё
	if ($_POST['data']['status'] == 'withdraw') {
		$id_of_transaction = $_POST['data']['id'];

		$get_payment = $pdo->query('SELECT * FROM withdrawal WHERE id = '.$id_of_transaction.' LIMIT 1');
		$payment = $get_payment->fetch();

		$amount_get = $payment['amount_get'];
		$currency_withdraw = $payment['currency'];
		$wallet = $payment['wallet'];

		switch ($payment['paysystem']) {
			case 'payeer':

				$amount_get = number_format($amount_get, 2, '.', '');

				$accountNumber = $settings_payments->get('payeer', 'account');
				$apiId = $settings_payments->get('payeer', 'apiid');
				$apiKey = $settings_payments->get('payeer', 'apisecret');

				require_once '../classes/cpayeer.php';
				$api_payeer = new CPayeer($accountNumber, $apiId, $apiKey);
				if ($api_payeer->isAuth()) {
					$arBalance = $api_payeer->getBalance();
					$tmp_go_pay = false;
					if ($currency_withdraw == 'RUB' &&
						$arBalance["balance"]["RUB"]["DOSTUPNO"] > $amount_get) {
						$tmp_go_pay = true;
					} elseif ($currency_withdraw == 'USD' &&
						$arBalance["balance"]["USD"]["DOSTUPNO"] > $amount_get) {
						$tmp_go_pay = true;
					} else {
						// $epsResponse = 'Недостаточно денег на кошельке';
					}
				} else {
					// fputs($log_name, print_r('not auth in paysys', true));
				}

				if ($tmp_go_pay) {
					// fputs($log_name, print_r('prepare transfer', true));

					$arTransfer = $api_payeer->transfer(array(
						'curIn' => $currency_withdraw, // счет списания
						'sum' => $amount_get, // сумма получения
						'curOut' => $currency_withdraw, // валюта получения
						'to' => $wallet, // получатель (номер счета)
						'comment' => $root_url . ' | Your payment' . $id_of_transaction
					));
					// $pdo->query('UPDATE withdrawal SET status = 1 WHERE id = '.$id_of_transaction.' LIMIT 1');
					payments_set_status($id_of_transaction, 1, 'withdrawal');
					
					// fputs($log_name, print_r('OK', true));
				} else {
					// fputs($log_name, print_r('not enough money', true));
				}
				break;

			case 'advcash':

				$amount_get = number_format($amount_get, 2, '.', '');

				require_once '../classes/MerchantWebService.php';

				$merchantWebService = new MerchantWebService();

				$arg0 = new authDTO();
				$arg0->apiName = $settings_payments->get('advcash', 'apiname');
				$arg0->accountEmail = $settings_payments->get('advcash', 'email');
				$arg0->authenticationToken = $merchantWebService->getAuthenticationToken($settings_payments->get('advcash', 'apipass'));

				$can_pay = false;
				$getBalances = new getBalances();
				$getBalances->arg0 = $arg0;

				try {
					$getBalancesResponse = $merchantWebService->getBalances($getBalances);
					$getBalancesResponse = $getBalancesResponse->return;

					if ($currency_withdraw == 'RUB') {
						foreach ($getBalancesResponse as $value) {
							if (strpos($value->id, 'R') !== false) {
								if ($value->amount >= $amount_get) {
									$can_pay = true;
								}
							}
						}
					} elseif ($currency_withdraw == 'USD') {
						foreach ($getBalancesResponse as $value) {
							if (strpos($value->id, 'U') !== false) {
								if ($value->amount >= $amount_get) {
									$can_pay = true;
								}
							}
						}
					}

					if ($can_pay == true) {
						$arg1 = new sendMoneyRequest();
						$arg1->amount = $amount_get;
						if ($currency_withdraw == 'RUB') {
							$arg1->currency = 'RUR';
						} else {
							$arg1->currency = $currency_withdraw;
						}										
						// $arg1->email = "receiver_email";
						$arg1->walletId = $wallet;
						$arg1->note = $root_url . ' | Your payment' . $id_of_transaction;
						$arg1->savePaymentTemplate = false;

						$validationSendMoney = new validationSendMoney();
						$validationSendMoney->arg0 = $arg0;
						$validationSendMoney->arg1 = $arg1;

						$sendMoney = new sendMoney();
						$sendMoney->arg0 = $arg0;
						$sendMoney->arg1 = $arg1;

						try {
							$merchantWebService->validationSendMoney($validationSendMoney);
							$sendMoneyResponse = $merchantWebService->sendMoney($sendMoney);

							// $pdo->query('UPDATE withdrawal SET status = 1 WHERE id = '.$id_of_transaction.' LIMIT 1');
							payments_set_status($id_of_transaction, 1, 'withdrawal');

							// echo print_r($sendMoneyResponse, true)."<br/><br/>";
							// echo $sendMoneyResponse->return."<br/><br/>";
						} catch (Exception $e) {
							echo "ERROR MESSAGE => " . $e->getMessage() . "<br/>";
							echo $e->getTraceAsString();
						}
					} else {
						// $epsResponse = 'Недостаточно денег на кошельке';
					}
				} catch (Exception $e) {
					echo "ERROR MESSAGE => " . $e->getMessage() . "<br/>";
					echo $e->getTraceAsString();
				}
				break;

			case 'perfectmoney':

				$amount_get = number_format($amount_get, 2, '.', '');

				$f = fopen('https://perfectmoney.is/acct/balance.asp?AccountID=' . $settings_payments->get('perfectmoney', 'accountid') . '&PassPhrase=' . $settings_payments->get('perfectmoney', 'password'), 'rb');
				if ($f === false) {
					echo 'error openning url';
				}

				//	получаем данные
				$out = array();
				$out = '';
				while(!feof($f)) {
					$out .= fgets($f);
				}
				fclose($f);

				//	ищем скрытые input
				if(!preg_match_all("/<input name='(.*)' type='hidden' value='(.*)'>/", $out, $result, PREG_SET_ORDER)) {
					echo 'Ivalid output';
					exit;
				}

				$ar = array();
				foreach($result as $item) {
					$key = $item[1];
					$ar[$key] = $item[2];
				}

				$tmp_go_pay = false;

				if (isset($ar[$settings_payments->get('perfectmoney', 'account')]) &&
					number_format($ar[$settings_payments->get('perfectmoney', 'account')], 2, '.', '') >= number_format($amount_get, 2, '.', '')) {
					$tmp_go_pay = true;
				}

				if ($tmp_go_pay) {
					$f = file_get_contents('https://perfectmoney.is/acct/confirm.asp?AccountID=' . $settings_payments->get('perfectmoney', 'accountid') . '&PassPhrase=' . $settings_payments->get('perfectmoney', 'password') . '&Payer_Account=' . $settings_payments->get('perfectmoney', 'account') . '&Payee_Account=' . $wallet . '&Amount=' . $amount_get . '&PAY_IN=1&PAYMENT_ID=' . $id_of_transaction . '&Memo=' . $root_url . ' | Your payment' . $id_of_transaction);

					payments_set_status($id_of_transaction, 1, 'withdrawal');

				} else {
					// fputs($log_name, print_r('not enough money', true));
					// fputs($log_name, PHP_EOL);
				}
				break;
		}

		echo '1';

	} elseif ($_POST['data']['status'] == 'delete') {
		
		payments_set_status($_POST['data']['id'], 2, 'withdrawal');

		$get_payment = $pdo->query('SELECT * FROM withdrawal WHERE id = '.$_POST['data']['id'].' LIMIT 1');
		$payment = $get_payment->fetch();

		$update_stat = $pdo->query('UPDATE users SET balance_withdrawal = balance_withdrawal + '.$payment['amount'].', total_withdrawal = total_withdrawal - '.$payment['amount'].' WHERE id = '.$payment['user_id'].' LIMIT 1');

		echo '1';

	} elseif ($_POST['data']['status'] == 0 || $_POST['data']['status'] == 1 || $_POST['data']['status'] == 2) {
		
		payments_set_status($_POST['data']['id'], $_POST['data']['status'], 'withdrawal');
		echo '1';

	}
}

if ($_POST['action'] == 'get_page') {
	
	$payment_status = 0;
	if (isset($_POST['data']['status'])) {
		$payment_status = $_POST['data']['status'];
	}

	if (!isset($_POST['data']['page']) && !isset($_POST['data']['status'])) {
?>
		<div data-placeholder="result_payments">
<?php
	}

	if ($payment_status == 0) {
?>
		<p>Статус: <a class="get-status-list active" data-status="0" data-result="result_payments">ожидание</a> | <a class="get-status-list" data-status="1" data-result="result_payments">выполнено</a> | <a class="get-status-list" data-status="2" data-result="result_payments">отклонено</a></p>
<?php
	} elseif ($payment_status == 1) {
?>
		<p>Статус: <a class="get-status-list" data-status="0" data-result="result_payments">ожидание</a> | <a class="get-status-list active" data-status="1" data-result="result_payments">выполнено</a> | <a class="get-status-list" data-status="2" data-result="result_payments">отклонено</a></p>
<?php
	} else {
?>
	<p>Статус: <a class="get-status-list" data-status="0" data-result="result_payments">ожидание</a> | <a class="get-status-list" data-status="1" data-result="result_payments">выполнено</a> | <a class="get-status-list active" data-status="2" data-result="result_payments">отклонено</a></p>
<?php
	}

	if (isset($_POST['data']['page'])) {
		$page = $_POST['data']['page'];
	} else {
		$page = 1;
	}

	$payments = payments_get_list('withdrawal', $payment_status, $page, 30);
	if ($payments != 'empty') {
?>
			<div class="table-default">
				<div class="table-row table-header">
					<div class="table-column" style="width: 4%">ID</div>
					<div class="table-column" style="width: 18%">Логин</div>
					<div class="table-column" style="width: 10%">Сумма</div>
					<div class="table-column" style="width: 12%" title="Валюта(платежная система)">Платежка</div>
					<div class="table-column" style="width: 12%">К получению</div>
					<div class="table-column" style="width: 12%">Дата</div>
					<div class="table-column" style="width: 13%">Кошелек</div>
					<!-- <div class="table-column" style="width: 10%">Статус</div> -->
					<div class="table-column" style="width: 10%">Кнопки</div>
				</div>
				<?php
				foreach ($payments['items'] as $key => $value) {
					$find_user = users_search_id($value['user_id']);
					$login = $find_user['login'];
				?>
					<div class="table-row">
						<div class="table-column" style="width: 4%"><?= $value['id']; ?></div>
						<div class="table-column" style="width: 18%">
							<span data-edit="users/edit_user" data-id="<?= $value['user_id']; ?>">
								<?= $login; ?>
							</span>
						</div>
						<div class="table-column" style="width: 10%"><?= format_money($value['amount']); ?></div>
						<div class="table-column" style="width: 12%"><?= $value['paysystem']; ?></div>
						<div class="table-column" style="width: 12%">
						<?php
							if ($value['currency'] == 'RUB' || $value['currency'] == 'USD') {
								echo number_format($value['amount_get'], 2, '.', '');
							} else {
								echo number_format($value['amount_get'], 8, '.', '');
							}
							echo '&nbsp;' . $value['currency'];
						?>
						</div>
						<div class="table-column" style="width: 12%" title="Подтверждено: <?= date('d.m.y H:i', $value['date_confirmed']); ?>"><?= date('d.m.y H:i', $value['date_created']); ?></div>
						<div class="table-column" style="width: 13%; overflow-x: auto;"><?= $value['wallet']; ?></div>
						<!-- <div class="table-column" style="width: 10%"><?= $value['status']; ?></div> -->
						<div class="table-column center" style="width: 10%">
						<?php
							if ($payment_status == 0) {
								if ($value['paysystem'] == 'qiwi') {
									$summ_to_qiwi_fractal = floor(fmod($value['amount_get'], 1) * 100);
									$summ_to_qiwi = floor($value['amount_get']);
							?>
									<a class="button-d square" target="_blank" href="https://qiwi.com/payment/form/99/?extra%5B%27account%27%5D=<?= $value['wallet']; ?>&amountInteger=<?= $summ_to_qiwi; ?>&amountFraction=<?= $summ_to_qiwi_fractal; ?>&extra%5B%27comment%27%5D=%23<?= $value['id']; ?>&provider=99">Q</a>
							<?php
								} else {
							?>
									<button class="button-d square" data-set-status="withdraw" data-id="<?= $value['id']; ?>" title="Выплатить">&#10142;</button>
							<?php
								}
							
						?>
								<button class="button-d square" data-set-status="1" data-id="<?= $value['id']; ?>" title="Отметить как выполнено">&#10003;</button>
								<button class="button-d square" data-set-status="delete" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Удалить и вернуть деньги на счёт">&#215;</button>
						<?php
							} elseif ($payment_status == 1) {
						?>
								<button class="button-d square" data-set-status="0" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Переместить в ожидание">&#8634;</button>
								<button class="button-d square" data-set-status="delete" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Удалить и вернуть деньги на счёт">&#215;</button>
						<?php
							} else {
						?>
								<button class="button-d square" data-set-status="0" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Переместить в ожидание">&#8634;</button>
								<button class="button-d square" data-set-status="withdraw" data-id="<?= $value['id']; ?>" title="Выплатить">&#10142;</button>
								<button class="button-d square" data-set-status="1" data-id="<?= $value['id']; ?>" title="Отметить как выполнено">&#10003;</button>
						<?php
							}
						?>
						</div>
					</div>
				<?php
					}
				?>
				<div class="pagination" data-result="result_payments" data-status="<?= $payment_status; ?>">
				<?php
					$pagination = $payments['pagination'];
					if ($pagination['prev']) {
						echo '<a data-page="'.$pagination['prev'].'"><<</a>';
					} else {
						echo '<span><<</span>';
					}
					if ($pagination['minustwo']) echo '<a data-page="'.$pagination['minustwo'].'">'.$pagination['minustwo'].'</a>';
					if ($pagination['minusone']) echo '<a data-page="'.$pagination['minusone'].'">'.$pagination['minusone'].'</a>';
					echo '<span>'.$pagination['current'].'</span>';
					if ($pagination['plusone']) echo '<a data-page="'.$pagination['plusone'].'">'.$pagination['plusone'].'</a>';
					if ($pagination['plustwo']) echo '<a data-page="'.$pagination['plustwo'].'">'.$pagination['plustwo'].'</a>';
					if ($pagination['next']) {
						echo '<a data-page="'.$pagination['next'].'">>></a>';
					} else {
						echo '<span>>></span>';
					}
				?>
				</div>
			</div>
<?php
	} else {
?>
		<p class="description">Таких выплат нет.</p>
<?php
	}
	if (!isset($_POST['data']['page'])) {
?>
		</div>
<?php
	}
}
?>