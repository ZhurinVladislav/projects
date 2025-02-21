<?php

require_once './pages/withdrawal/'.$user->language.'.php';

require_once './functions/payments.php';

//	статусы платежей в базе:
//	0 - ожидает оплаты
//	1 - оплачено
//	2 - отклонено

$response = array('status' => '0');

if ($user->is_logged() == true && $user->can_withdrawal === 1) {
	$amount_output = $_POST['items']['amount'];

	$wallet = clean_string($_POST['items']['wallet']);

	$pin = (int) $_POST['items']['pin'];

	if ($pin === $user->pin) {

		if (preg_match('/^([0-9]+)\.[0-9]{1,8}$/', $amount_output) === 1 || preg_match('/^([0-9]+)$/', $amount_output) === 1) {

			$amount_output = format_money($amount_output);

			if ($user->balance_withdrawal >= $amount_output) {

				if ($user->credit === 0) {

					switch ($_POST['items']['payment_system']) {
						case 'qiwi':

							//	соотношение валюты, которую мы даем, к долларам, которые мы получаем
							$currency_ratio = $settings->get('currency_ratio');
							//	курс 1 доллара к рублям
							$currency_usd = $settings->get('currency_usd');

							$amount_get = number_format(round($amount_output * $currency_ratio * $currency_usd * .95, 2), 2, '.', '');

							if ($amount_get >= number_format($settings->get('withdraw_minimum_rub'), 2, '.', '')) {

								$create_transaction = $pdo->prepare('INSERT INTO withdrawal (user_id, paysystem, currency, wallet, amount, amount_get, date_created, date_confirmed, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
								$create_transaction->execute(array($user->id, 'qiwi', 'RUB', $wallet, $amount_output, $amount_get, time(), 0, $user->fake, 0));

								$id_of_transaction = $pdo->lastInsertId();

								update_balance($user->id, 'withdrawal', '-', $amount_output);

								$update_stat = $pdo->query('UPDATE users SET total_withdrawal = total_withdrawal + '.$amount_output.' WHERE id = '.$user->id.' LIMIT 1');


								$response['status'] = 'ok';
								$response['print'] = '<div class="success-attr">
														<div class="success-attr__text">'.$_txt['withdraw_print'].'</div>
													</div>
													<div class="btn-default_2" data-navigation data-href="home" data-template="main_inner"><span>'.$_txt['withdraw_print_gohome'].'</span></div>';

							} else {
								$response['status'] = 'error';
								$response['placeholder'] = 'wrong_amount';
								$response['print'] = $_txt['error']['min_sum'].' '.format_money(round_money($settings->get('withdraw_minimum_rub') / $currency_ratio / $currency_usd / .95));
							}
							break;

						case 'payeer':

							if (verify_payeer($wallet) != false) {


								//	соотношение валюты, которую мы даем, к рублям, которые мы получаем
								$currency_ratio = $settings->get('currency_ratio');

								$currency_withdraw = $_POST['items']['currency'];

								if ($currency_withdraw == 'RUB') {
									$currency_usd = $settings->get('currency_usd');
									$amount_get = number_format(round($amount_output * $currency_ratio * $currency_usd * .95, 2), 2, '.', '');
								} elseif ($currency_withdraw == 'USD') {
									$amount_get = number_format(round($amount_output * $currency_ratio * .95, 2), 2, '.', '');
								}

								if (($currency_withdraw == 'RUB' && $amount_get >= number_format($settings->get('withdraw_minimum_rub'), 2, '.', '')) || ($currency_withdraw == 'USD' && $amount_get >= number_format($settings->get('withdraw_minimum_usd'), 2, '.', ''))) {

									$create_transaction = $pdo->prepare('INSERT INTO withdrawal (user_id, paysystem, currency, wallet, amount, amount_get, date_created, date_confirmed, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
									$create_transaction->execute(array($user->id, 'payeer', $currency_withdraw, $wallet, $amount_output, $amount_get, time(), 0, $user->fake, 0));

									$id_of_transaction = $pdo->lastInsertId();

									update_balance($user->id, 'withdrawal', '-', $amount_output);

									$update_stat = $pdo->query('UPDATE users SET total_withdrawal = total_withdrawal + '.$amount_output.' WHERE id = '.$user->id.' LIMIT 1');


									// $accountNumber = $settings_payments->get('payeer', 'account');
									// $apiId = $settings_payments->get('payeer', 'apiid');
									// $apiKey = $settings_payments->get('payeer', 'apisecret');

									// require_once './classes/cpayeer.php';
									// $api_payeer = new CPayeer($accountNumber, $apiId, $apiKey);
									// if ($api_payeer->isAuth()) {
									// 	$arBalance = $api_payeer->getBalance();
									// 	$tmp_go_pay = false;
									// 	if ($currency_withdraw == 'RUB' &&
									// 		$arBalance["balance"]["RUB"]["DOSTUPNO"] > $amount_get) {
									// 		$tmp_go_pay = true;
									// 	} elseif ($currency_withdraw == 'USD' &&
									// 		$arBalance["balance"]["USD"]["DOSTUPNO"] > $amount_get) {
									// 		$tmp_go_pay = true;
									// 	} else {
									// 		// $epsResponse = 'Недостаточно денег на кошельке';
									// 	}
									// } else {
									// 	// fputs($log_name, print_r('not auth in paysys', true));
									// }

									// if (isset($tmp_go_pay) && $tmp_go_pay == true) {
									// 	// fputs($log_name, print_r('prepare transfer', true));

									// 	$arTransfer = $api_payeer->transfer(array(
									// 		'curIn' => $currency_withdraw, // счет списания
									// 		'sum' => $amount_get, // сумма получения
									// 		'curOut' => $currency_withdraw, // валюта получения
									// 		'to' => $wallet, // получатель (номер счета)
									// 		'comment' => $root_url . ' | Your payment' . $id_of_transaction
									// 	));
									// 	// $pdo->query('UPDATE withdrawal SET status = 1 WHERE id = '.$id_of_transaction.' LIMIT 1');
									// 	payments_set_status($id_of_transaction, 1, 'withdrawal');
										
									// 	// fputs($log_name, print_r('OK', true));
									// } else {
									// 	// fputs($log_name, print_r('not enough money', true));
									// }


									$response['status'] = 'ok';
									$response['print'] = '<div class="success-attr">
															<div class="success-attr__text">'.$_txt['withdraw_print'].'</div>
														</div>
														<div class="btn-default_2" data-navigation data-href="home" data-template="main_inner"><span>'.$_txt['withdraw_print_gohome'].'</span></div>';

								} else {
									$response['status'] = 'error';
									$response['placeholder'] = 'wrong_amount';

									if ($currency_withdraw == 'RUB') {
										$response['print'] = $_txt['error']['min_sum'].' '.format_money(round_money($settings->get('withdraw_minimum_rub') / $currency_ratio / $currency_usd / .95));
									} elseif ($currency_withdraw == 'USD') {
										$response['print'] = $_txt['error']['min_sum'].' '.format_money(round_money($settings->get('withdraw_minimum_usd') / $currency_ratio / .95));
									}
									
								}
								
							} else {
								$response['status'] = 'error';
								$response['placeholder'] = 'wrong_wallet';
								$response['print'] = $_txt['error']['wrong_wallet_payeer'];
							}
							break;

						case 'advcash':

							//	соотношение валюты, которую мы даем, к рублям, которые мы получаем
							$currency_ratio = $settings->get('currency_ratio');

							$currency_withdraw = $_POST['items']['currency'];

							if ($currency_withdraw == 'RUB') {
								$currency_usd = $settings->get('currency_usd');
								$amount_get = number_format(round($amount_output * $currency_ratio * $currency_usd * .95, 2), 2, '.', '');
							} elseif ($currency_withdraw == 'USD') {
								$amount_get = number_format(round($amount_output * $currency_ratio * .95, 2), 2, '.', '');
							}

							if (($currency_withdraw == 'RUB' && $amount_get >= number_format($settings->get('withdraw_minimum_rub'), 2, '.', '')) || ($currency_withdraw == 'USD' && $amount_get >= number_format($settings->get('withdraw_minimum_usd'), 2, '.', ''))) {

								$create_transaction = $pdo->prepare('INSERT INTO withdrawal (user_id, paysystem, currency, wallet, amount, amount_get, date_created, date_confirmed, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
								$create_transaction->execute(array($user->id, 'advcash', $currency_withdraw, $wallet, $amount_output, $amount_get, time(), 0, $user->fake, 0));

								$id_of_transaction = $pdo->lastInsertId();

								update_balance($user->id, 'withdrawal', '-', $amount_output);

								$update_stat = $pdo->query('UPDATE users SET total_withdrawal = total_withdrawal + '.$amount_output.' WHERE id = '.$user->id.' LIMIT 1');


								// require_once './classes/MerchantWebService.php';

								// $merchantWebService = new MerchantWebService();

								// $arg0 = new authDTO();
								// $arg0->apiName = $settings_payments->get('advcash', 'apiname');
								// $arg0->accountEmail = $settings_payments->get('advcash', 'email');
								// $arg0->authenticationToken = $merchantWebService->getAuthenticationToken($settings_payments->get('advcash', 'apipass'));

								// $can_pay = false;
								// $getBalances = new getBalances();
								// $getBalances->arg0 = $arg0;

								// try {
								// 	$getBalancesResponse = $merchantWebService->getBalances($getBalances);
								// 	$getBalancesResponse = $getBalancesResponse->return;

								// 	if ($currency_withdraw == 'RUB') {
								// 		foreach ($getBalancesResponse as $value) {
								// 			if (strpos($value->id, 'R') !== false) {
								// 				if ($value->amount >= $amount_get) {
								// 					$can_pay = true;
								// 				}
								// 			}
								// 		}
								// 	} elseif ($currency_withdraw == 'USD') {
								// 		foreach ($getBalancesResponse as $value) {
								// 			if (strpos($value->id, 'U') !== false) {
								// 				if ($value->amount >= $amount_get) {
								// 					$can_pay = true;
								// 				}
								// 			}
								// 		}
								// 	}

								// 	if ($can_pay == true) {
								// 		$arg1 = new sendMoneyRequest();
								// 		$arg1->amount = $amount_get;
								// 		if ($currency_withdraw == 'RUB') {
								// 			$arg1->currency = 'RUR';
								// 		} else {
								// 			$arg1->currency = $currency_withdraw;
								// 		}										
								// 		// $arg1->email = "receiver_email";
								// 		$arg1->walletId = $wallet;
								// 		$arg1->note = $root_url . ' | Your payment' . $id_of_transaction;
								// 		$arg1->savePaymentTemplate = false;

								// 		$validationSendMoney = new validationSendMoney();
								// 		$validationSendMoney->arg0 = $arg0;
								// 		$validationSendMoney->arg1 = $arg1;

								// 		$sendMoney = new sendMoney();
								// 		$sendMoney->arg0 = $arg0;
								// 		$sendMoney->arg1 = $arg1;

								// 		try {
								// 			$merchantWebService->validationSendMoney($validationSendMoney);
								// 			$sendMoneyResponse = $merchantWebService->sendMoney($sendMoney);

								// 			// $pdo->query('UPDATE withdrawal SET status = 1 WHERE id = '.$id_of_transaction.' LIMIT 1');
								// 			payments_set_status($id_of_transaction, 1, 'withdrawal');

								// 			// echo print_r($sendMoneyResponse, true)."<br/><br/>";
								// 			// echo $sendMoneyResponse->return."<br/><br/>";
								// 		} catch (Exception $e) {
								// 			echo "ERROR MESSAGE => " . $e->getMessage() . "<br/>";
								// 			echo $e->getTraceAsString();
								// 		}
								// 	} else {
								// 		// $epsResponse = 'Недостаточно денег на кошельке';
								// 	}
								// } catch (Exception $e) {
								// 	echo "ERROR MESSAGE => " . $e->getMessage() . "<br/>";
								// 	echo $e->getTraceAsString();
								// }


								$response['status'] = 'ok';
								$response['print'] = '<div class="success-attr">
														<div class="success-attr__text">'.$_txt['withdraw_print'].'</div>
													</div>
													<div class="btn-default_2" data-navigation data-href="home" data-template="main_inner"><span>'.$_txt['withdraw_print_gohome'].'</span></div>';

							} else {
								$response['status'] = 'error';
								$response['placeholder'] = 'wrong_amount';
								
								if ($currency_withdraw == 'RUB') {
									$response['print'] = $_txt['error']['min_sum'].' '.format_money(round_money($settings->get('withdraw_minimum_rub') / $currency_ratio / $currency_usd / .95));
								} elseif ($currency_withdraw == 'USD') {
									$response['print'] = $_txt['error']['min_sum'].' '.format_money(round_money($settings->get('withdraw_minimum_usd') / $currency_ratio / .95));
								}
								
							}
							break;

						case 'perfectmoney':

							//	соотношение валюты, которую мы даем, к рублям, которые мы получаем
							$currency_ratio = $settings->get('currency_ratio');

							$amount_get = number_format(round($amount_output * $currency_ratio * .95, 2), 2, '.', '');

							if ($amount_get >= number_format($settings->get('withdraw_minimum_usd'), 2, '.', '')) {

								$create_transaction = $pdo->prepare('INSERT INTO withdrawal (user_id, paysystem, currency, wallet, amount, amount_get, date_created, date_confirmed, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
								$create_transaction->execute(array($user->id, 'perfectmoney', 'USD', $wallet, $amount_output, $amount_get, time(), 0, $user->fake, 0));

								$id_of_transaction = $pdo->lastInsertId();

								update_balance($user->id, 'withdrawal', '-', $amount_output);

								$update_stat = $pdo->query('UPDATE users SET total_withdrawal = total_withdrawal + '.$amount_output.' WHERE id = '.$user->id.' LIMIT 1');


								// $f = fopen('https://perfectmoney.is/acct/balance.asp?AccountID=' . $settings_payments->get('perfectmoney', 'accountid') . '&PassPhrase=' . $settings_payments->get('perfectmoney', 'password'), 'rb');
								// if ($f === false) {
								// 	echo 'error openning url';
								// }

								// //	получаем данные
								// $out = array();
								// $out = '';
								// while(!feof($f)) {
								// 	$out .= fgets($f);
								// }
								// fclose($f);

								// //	ищем скрытые input
								// if(!preg_match_all("/<input name='(.*)' type='hidden' value='(.*)'>/", $out, $result, PREG_SET_ORDER)) {
								// 	echo 'Ivalid output';
								// 	exit;
								// }

								// $ar = array();
								// foreach($result as $item) {
								// 	$key = $item[1];
								// 	$ar[$key] = $item[2];
								// }

								// $tmp_go_pay = false;
								
								// if (isset($ar[$settings_payments->get('perfectmoney', 'account')]) &&
								// 	number_format($ar[$settings_payments->get('perfectmoney', 'account')], 2, '.', '') > $amount_get) {
								// 	$tmp_go_pay = true;
								// }

								// if ($tmp_go_pay) {
								// 	$f = file_get_contents('https://perfectmoney.is/acct/confirm.asp?AccountID=' . $settings_payments->get('perfectmoney', 'accountid') . '&PassPhrase=' . $settings_payments->get('perfectmoney', 'password') . '&Payer_Account=' . $settings_payments->get('perfectmoney', 'account') . '&Payee_Account=' . $wallet . '&Amount=' . $amount_get . '&PAY_IN=1&PAYMENT_ID=' . $id_of_transaction . '&Memo=' . $root_url . ' | Your payment' . $id_of_transaction);

								// 	payments_set_status($id_of_transaction, 1, 'withdrawal');
								// } else {
								// 	// fputs($log_name, print_r('not enough money', true));
								// 	// fputs($log_name, PHP_EOL);
								// }


								$response['status'] = 'ok';
								$response['print'] = '<div class="success-attr">
														<div class="success-attr__text">'.$_txt['withdraw_print'].'</div>
													</div>
													<div class="btn-default_2" data-navigation data-href="home" data-template="main_inner"><span>'.$_txt['withdraw_print_gohome'].'</span></div>';
							
							} else {
								$response['status'] = 'error';
								$response['placeholder'] = 'wrong_amount';
								$response['print'] = $_txt['error']['min_sum'].' '.format_money(round_money($settings->get('withdraw_minimum_usd') / $currency_ratio / .95));
							}
							break;
							
						case 'bitcoin':

							//	соотношение валюты, которую мы даем, к долларам, которые мы получаем
							// $currency_ratio = $settings->get('currency_ratio');
							// //	курс 1 доллара к рублям
							// $currency_usd = $settings->get('currency_usd');
							// //	курс 1 биткоина к доллару
							// $currency_usd_to_btc = $settings->get('currency_usd_to_btc');

							// $amount_get = number_format(round($amount_output * $currency_ratio * $currency_usd_to_btc * .95, 8), 8, '.', '');

							$amount_get = number_format(round($amount_output * .95, 8), 8, '.', '');

							if ($amount_get >= number_format($settings->get('withdraw_minimum_btc'), 8, '.', '')) {

								$create_transaction = $pdo->prepare('INSERT INTO withdrawal (user_id, paysystem, currency, wallet, amount, amount_get, date_created, date_confirmed, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
								$create_transaction->execute(array($user->id, 'coinpayments', 'BTC', $wallet, $amount_output, $amount_get, time(), 0, $user->fake, 0));

								$id_of_transaction = $pdo->lastInsertId();

								update_balance($user->id, 'withdrawal', '-', $amount_output);

								$update_stat = $pdo->query('UPDATE users SET total_withdrawal = total_withdrawal + '.$amount_output.' WHERE id = '.$user->id.' LIMIT 1');


								// require_once './classes/coinpayments.php';

								// $cps = new CoinPaymentsAPI();
								// $cps->Setup($settings_payments->get('coinpayments', 'privatekey'), $settings_payments->get('coinpayments', 'publickey'));

								// $result = $cps->CreateWithdrawal($amount_get, 'BTC', $wallet, 1, $root_url.'coinpayments_withdraw_result.php');
								
								// if ($result['error'] == 'ok') {
								// 	$pdo->query('INSERT INTO `bitcoin_withdraw` (`withdraw_id`, `received_id`, `date`) VALUES ('.$id_of_transaction.', "'.$result['result']['id'].'", '.time().')');
								// } else {
								// 	print 'Error: '.$result['error']."\n";
								// 	print_r($result);
								// }


								$response['status'] = 'ok';
								$response['print'] = '<div class="success-attr">
														<div class="success-attr__text">'.$_txt['withdraw_print'].'</div>
													</div>
													<div class="btn-default_2" data-navigation data-href="home" data-template="main_inner"><span>'.$_txt['withdraw_print_gohome'].'</span></div>';

							} else {
								$response['status'] = 'error';
								$response['placeholder'] = 'wrong_amount';
								$response['print'] = $_txt['error']['min_sum'].' '.format_money(round_money($settings->get('withdraw_minimum_btc') / $currency_ratio / $currency_usd_to_btc / .95));
							}
							break;
						
						default:
							$response['status'] = 'fail';
							$response['error'] = 'no_system';
							break;
					}

					$select_balances = $pdo->prepare('SELECT balance_buy, balance_withdrawal FROM users WHERE id = ?');
					$select_balances->execute(array($user->id));
					$balances = $select_balances->fetch();

					$response['balance_buy'] = format_money($balances['balance_buy']);
					$response['balance_withdrawal'] = format_money($balances['balance_withdrawal']);
					
				} else {
					$response['status'] = 'fail';
					$response['error'] = 'has_credit';
				}
			} else {
				$response['status'] = 'error';
				$response['placeholder'] = 'wrong_amount';
				$response['print'] = $_txt['error']['not_enough_money_withdrawal'];
			}
		} else {
			$response['status'] = 'error';
			$response['placeholder'] = 'wrong_amount';
			$response['print'] = $_txt['error']['wrong_amount'].' '.format_money(1);
		}
	} else {
		$response['status'] = 'error';
		$response['placeholder'] = 'wrong_pin';
		$response['print'] = $_txt['error']['wrong_pin'];
	}
} else {
	$response['status'] = 'need_login';
}

echo json_encode($response);