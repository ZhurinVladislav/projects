<?php

require_once './pages/replenish/'.$user->language.'.php';

//	статусы платежей в базе:
//	0 - ожидает оплаты
//	1 - оплачено
//	2 - удалено

//	скрипт, который вставляется в ответ клиенту при пополнении через крипту
//	просто визуальный таймер обратного отсчёта
$timer_script = '
<script>
	$(function() {
		function timer() {
			var time = new Date(($("#crypto_timer").attr("data-time") * 1000));
			var timeM = time.getMinutes();
			var timeS = time.getSeconds();
			var timestring = timeM + ":" + timeS;
			$("#crypto_timer").text(timestring);
			$("#crypto_timer").attr("data-time", $("#crypto_timer").attr("data-time") - 1);
		}
		timer();
		setInterval(function() {
			timer();
		}, 1000);
	});
</script>';

$response = array('status' => '0');

if ($user->is_logged() == true) {
	$amount_enter = $_POST['items']['amount'];

	if (preg_match('/^([0-9]+)\.[0-9]{1,8}$/', $amount_enter) === 1 || preg_match('/^([0-9]+)$/', $amount_enter) === 1) {

		$amount_enter = number_format($amount_enter, 8, '.', '');

		//	соотношение валюты, которую мы даем, к рублям, которые мы получаем
		$currency_ratio = $settings->get('currency_ratio');

		//	процент, который дает акция, надо подтягивать из настроек движка
		//	но пока повисит единицей
		$action_percent = $settings->get('action_percent');

		switch ($_POST['items']['payment_system']) {
			case 'qiwi':

				//	курс 1 доллара к рублям
				$currency_usd = $settings->get('currency_usd');

				$amount_get = round_money($amount_enter / $currency_usd / $currency_ratio);

				$amount_get = format_money($amount_get);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'qiwi', 'RUB', $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();

				$summ_to_qiwi_fractal = floor(fmod($amount_enter, 1) * 100); 
				$summ_to_qiwi = floor($amount_enter);

				$wallet_qiwi = $settings_payments->get('qiwi', 'wallet');

				$response['status'] = 'ok';
				$response['print'] = '<div class="success-attr">
									<div class="success-attr__text">'.$_txt['qiwi']['description'].'</div>
								  </div>';
				// $response['print'] = '<br><br><div class="header_3 text-center">' . $_txt['qiwi']['description'] . '</div>';
				$response['print'] .= '<a class="qiwi_confirm_replenish btn-default_2" href="https://qiwi.com/payment/form/99?extra%5B%27account%27%5D='.$wallet_qiwi.'&amountInteger='.$summ_to_qiwi.'&amountFraction='.$summ_to_qiwi_fractal.'&extra%5B%27comment%27%5D=%23'.$id_of_transaction.'&currency=643" target="_blank"><span>'.$_txt['qiwi']['btn'].'</span></a>';
				$response['replenish_system'] = 'qiwi';

				break;

			case 'payeer':

				$replenish_currency = $_POST['items']['currency'];
				if ($replenish_currency == 'USD' || $replenish_currency == 'RUB') {

					$amount_get = round_money($amount_enter / $currency_ratio);

					if ($replenish_currency == 'RUB') {
						//	курс 1 доллара к рублям
						$currency_usd = $settings->get('currency_usd');
						$amount_get = round_money($amount_get / $currency_usd);
					}

					// if ($action_percent != 0) {
					// 	$amount_get = round_money($amount_get + ($amount_get * $action_percent / 100));
					// }
					$amount_get = format_money($amount_get);

					$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
					$create_transaction->execute(array($user->id, 'payeer', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

					$id_of_transaction = $pdo->lastInsertId();

					$m_shop = $settings_payments->get('payeer', 'shopid');
					$m_orderid = $id_of_transaction;
					$m_amount = number_format($amount_enter, 2, '.', '');
					$m_curr = $replenish_currency;
					
					$m_desc = base64_encode($replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin);
					$m_key = $settings_payments->get('payeer', 'secret');

					$arHash = array(
						$m_shop,
						$m_orderid,
						$m_amount,
						$m_curr,
						$m_desc,
						$m_key
					);
					// print_r($arHash);
					$sign = strtoupper(hash('sha256', implode(':', $arHash)));

					$response['status'] = 'ok';
					$response['print'] = '
					<form class="replenish__form" method="POST" action="https://payeer.com/merchant/">
						<input type="hidden" name="m_shop" value="'.$m_shop.'">
						<input type="hidden" name="m_orderid" value="'.$m_orderid.'">
						<input type="hidden" name="m_amount" value="'.$m_amount.'">
						<input type="hidden" name="m_curr" value="'.$m_curr.'">
						<input type="hidden" name="m_desc" value="'.$m_desc.'">
						<input type="hidden" name="m_sign" value="'.$sign.'">
						
						<div class="success-attr">
							<div class="success-attr__text">
								<p>'.$_txt['form_replenish']['text_1'].' '.$m_amount.' '.$m_curr.'</p>
								<p>'.$_txt['form_replenish']['text_2'].' '.$amount_get.' '.$coin.'</p>
							</div>
						</div>

						<button type="submit" class="confirm_replenish" name="m_process"><span>'.$_txt['form_replenish']['btn'].'</span></button>
					</form>
					';
					$response['replenish_system'] = 'payeer';

				} else {
					$response['status'] = 'fail';
					$response['error'] = 'no_currency';
				}

				break;

			case 'advcash':

				$replenish_currency = $_POST['items']['currency'];
				if ($replenish_currency == 'USD' || $replenish_currency == 'RUB') {

					$amount_get = round_money($amount_enter / $currency_ratio);

					if ($replenish_currency == 'RUB') {
						//	курс 1 доллара к рублям
						$currency_usd = $settings->get('currency_usd');
						$amount_get = round_money($amount_get / $currency_usd);
					}

					// if ($action_percent != 0) {
					// 	$amount_get = round_money($amount_get + ($amount_get * $action_percent / 100));
					// }
					$amount_get = format_money($amount_get);

					$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
					$create_transaction->execute(array($user->id, 'advcash', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

					$id_of_transaction = $pdo->lastInsertId();

					$m_shopname = $settings_payments->get('advcash', 'sciname');
					$m_shopemail = $settings_payments->get('advcash', 'scimail');
					$m_orderid = $id_of_transaction;
					$m_amount = number_format($amount_enter, 2, '.', '');
					$m_curr = $replenish_currency;
					
					$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;
					$m_key = $settings_payments->get('advcash', 'scipass');

					$arHash = array(
						$m_shopemail,
						$m_shopname,
						$m_amount,
						$m_curr,
						$m_key,
						$m_orderid
					);
					// print_r($arHash);
					$sign = hash('sha256', implode(':', $arHash));

					$response['status'] = 'ok';
					$response['print'] = '
					<form class="replenish__form" method="POST" action="https://wallet.advcash.com/sci/">
						<input type="hidden" name="ac_account_email" value="'.$m_shopemail.'">
						<input type="hidden" name="ac_sci_name" value="'.$m_shopname.'">
						<input type="hidden" name="ac_order_id" value="'.$m_orderid.'">
						<input type="hidden" name="ac_amount" value="'.$m_amount.'">
						<input type="hidden" name="ac_currency" value="'.$m_curr.'">
						<input type="hidden" name="ac_sign" value="'.$sign.'">
						<input type="hidden" name="ac_comments" value="'.$m_desc.'">
						<input type="hidden" name="ac_success_url" value="'.$root_url.'replenish-success" />
						<input type="hidden" name="ac_success_url_method" value="POST" />
						<input type="hidden" name="ac_fail_url" value="'.$root_url.'/advcash_fail.php" />
						<input type="hidden" name="ac_fail_url_method" value="POST" />
						<input type="hidden" name="ac_status_url" value="'.$root_url.'/advcash_status.php" />
						<input type="hidden" name="ac_status_url_method" value="POST" />
										
						<div class="success-attr">
							<div class="success-attr__text">
								<p>'.$_txt['form_replenish']['text_1'].' <strong>'.$m_amount.'</strong> '.$m_curr.'</p>
								<p>'.$_txt['form_replenish']['text_2'].' '.$amount_get.' '.$coin.'</p>
							</div>
						</div>

						<button type="submit" class="confirm_replenish" name="m_process">'.$_txt['form_replenish']['btn'].'</button>
					</form>
					';
					$response['replenish_system'] = 'advcash';

				} else {
					$response['status'] = 'fail';
					$response['error'] = 'no_currency';
				}

				break;

			case 'perfectmoney':

				$amount_get = round_money($amount_enter / $currency_ratio);

				$replenish_currency = 'USD';

				$amount_get = format_money($amount_get);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'perfectmoney', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();
				
				$m_account = $settings_payments->get('perfectmoney', 'account');
				$m_shopname = $settings_payments->get('perfectmoney', 'payeename');
				$m_orderid = $id_of_transaction;
				$m_amount = number_format($amount_enter, 2, '.', '');
				$m_curr = $replenish_currency;
				
				$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;

				$response['status'] = 'ok';
				$response['print'] = '
				<form class="replenish__form" method="POST" action="https://perfectmoney.is/api/step1.asp">
					<input type="hidden" name="PAYEE_ACCOUNT" value="'.$m_account.'">
					<input type="hidden" name="PAYEE_NAME" value="'.$m_shopname.'">
					<input type="hidden" name="PAYMENT_ID" value="'.$m_orderid.'">
					<input type="hidden" name="PAYMENT_AMOUNT" value="'.$m_amount.'">
					<input type="hidden" name="PAYMENT_UNITS" value="'.$m_curr.'">
					<input type="hidden" name="STATUS_URL" value="'.$root_url.'perfectmoney_status.php">
					<input type="hidden" name="PAYMENT_URL" value="'.$root_url.'replenish-success">
					<input type="hidden" name="PAYMENT_URL_METHOD" value="POST">
					<input type="hidden" name="NOPAYMENT_URL" value="'.$root_url.'replenish">
					<input type="hidden" name="NOPAYMENT_URL_METHOD" value="POST">
					<input type="hidden" name="PAYMENT_METHOD" value="">
					<input type="hidden" name="BAGGAGE_FIELDS" value="">
					<input type="hidden" name="SUGGESTED_MEMO" value="'.$m_desc.'">
		
					<div class="success-attr">
						<div class="success-attr__text">
							<p>'.$_txt['form_replenish']['text_1'].' <strong>'.$m_amount.'</strong> '.$m_curr.'</p>
							<p>'.$_txt['form_replenish']['text_2'].' '.$amount_get.' '.$coin.'</p>
						</div>
					</div>

					<button type="submit" class="confirm_replenish" name="m_process"><span>'.$_txt['form_replenish']['btn'].'</span></button>
				</form>
				';
				$response['replenish_system'] = 'perfectmoney';

				break;

			case 'yandex':

				//	курс 1 доллара к рублям
				$currency_usd = $settings->get('currency_usd');

				$amount_get = round_money($amount_enter / $currency_usd / $currency_ratio);

				$replenish_currency = 'RUB';

				$amount_get = format_money($amount_get);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'yandex', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();
				
				$m_account = $settings_payments->get('yandex', 'wallet');
				$m_orderid = $id_of_transaction;
				$m_amount = number_format($amount_enter, 2, '.', '');
				$m_curr = $replenish_currency;
				
				$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;

				$response['status'] = 'ok';
				$response['print'] = '
				<form class="replenish__form" method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">

					<input type="hidden" name="sum" value="'.($m_amount * 1.005).'">
					<input type="hidden" name="receiver" value="'.$m_account.'">
					<input type="hidden" name="label" value="'.$m_orderid.'">
					<input type="hidden" name="successURL" value="'.$root_url.'replenish-success">
					<input type="hidden" name="formcomment" value="'.$replenish_description[$user->language]['3'].'">
					<input type="hidden" name="short-dest" value="'.$replenish_description[$user->language]['3'].'">
					<input type="hidden" name="quickpay-form" value="donate">
					<input type="hidden" id="targets" name="targets" value="'.$m_desc.'">

					<div class="success-attr">
						<div class="success-attr__text">
							<p>'.$_txt['form_replenish']['text_1'].' <strong>'.$m_amount.'</strong> '.$m_curr.'</p>
							<p>'.$_txt['form_replenish']['text_2'].' '.$amount_get.' '.$coin.'</p>
						</div>
					</div>

					<button type="submit" class="confirm_replenish" name="m_process"><span>'.$_txt['form_replenish']['btn'].'</span></button>
				</form>
				';
				$response['replenish_system'] = 'yandex';

				break;

			case 'bitcoin':

				//	курс 1 биткоина к доллару
				// $currency_btc_to_usd = $settings->get('currency_btc_to_usd');

				// $amount_get = round_money($amount_enter * $currency_btc_to_usd / $currency_ratio);

				$replenish_currency = 'BTC';

				// $amount_get = format_money($amount_get);

				$amount_get = format_money($amount_enter * 100);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'coinpayments', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();
				
				$m_orderid = $id_of_transaction;
				$m_amount = number_format($amount_enter, 2, '.', '');
				
				$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;

				require_once './classes/coinpayments.php';

				$cps = new CoinPaymentsAPI();
				$cps->Setup($settings_payments->get('coinpayments', 'privatekey'), $settings_payments->get('coinpayments', 'publickey'));

				$request = array(
					'amount' => $amount_enter,
					'currency1' => $replenish_currency,
					'currency2' => $replenish_currency,
					'address' => '',
					'item_name' => $coin,
					'item_desc' => $m_desc,
					'invoice' => $m_orderid,
					'buyer_email' => $user->email,
					'ipn_url' => $root_url.'coinpayments_result.php',
				);
				
				$result = $cps->CreateTransaction($request);

				//	временный костыль, пока биток не работает
				// $result['result']['amount'] = $amount_enter;
				// $result['result']['address'] = 'asdfasdfAXCeN4HrPDUTbJpxVNCG6Tbhjh';

				$response['status'] = 'ok';
				$response['print'] = '
					<div class="crypto_replenish_result">
						<div class="success-attr long">
							<div class="success-attr__text">
								<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

								<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

								<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
							</div>
						</div>
					</div>
				'.$timer_script;
				$response['replenish_system'] = 'bitcoin';

				// if ($result['error'] == 'ok') {

				// 	$response['status'] = 'ok';
				// 	$response['print'] = '
				// 		<div class="crypto_replenish_result">
				// 			<div class="success-attr long">
				// 				<div class="success-attr__text">
				// 					<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

				// 					<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

				// 					<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
				// 				</div>
				// 			</div>
				// 		</div>
				// 	'.$timer_script;
				// 	$response['replenish_system'] = 'bitcoin';

				// } else {
				// 	$response['status'] = 'fail';
				// 	$response['print'] = $result;
				// }

				break;

			case 'litecoin':

				//	курс 1 биткоина к доллару
				$currency_btc_to_usd = $settings->get('currency_btc_to_usd');
				//	курс 1 лайткоина к биткоину
				$currency_ltc_to_btc = $settings->get('currency_ltc_to_btc');

				//	переводим ltc -> btc -> usd -> игровая валюта
				$amount_get = round_money($amount_enter / $currency_ltc_to_btc * $currency_btc_to_usd / $currency_ratio);

				$replenish_currency = 'LTC';

				$amount_get = format_money($amount_get);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'coinpayments', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();
				
				$m_orderid = $id_of_transaction;
				$m_amount = number_format($amount_enter, 2, '.', '');
				
				$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;

				require_once './classes/coinpayments.php';

				$cps = new CoinPaymentsAPI();
				$cps->Setup($settings_payments->get('coinpayments', 'privatekey'), $settings_payments->get('coinpayments', 'publickey'));

				$request = array(
					'amount' => $amount_enter,
					'currency1' => $replenish_currency,
					'currency2' => $replenish_currency,
					'address' => '',
					'item_name' => $coin,
					'item_desc' => $m_desc,
					'invoice' => $m_orderid,
					'buyer_email' => $user->email,
					'ipn_url' => $root_url.'coinpayments_result.php',
				);
				
				$result = $cps->CreateTransaction($request);
				if ($result['error'] == 'ok') {

					$response['status'] = 'ok';
					$response['print'] = '
						<div class="crypto_replenish_result">
							<div class="success-attr long">
								<div class="success-attr__text">
									<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

									<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

									<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
								</div>
							</div>
						</div>
					'.$timer_script;
					$response['replenish_system'] = 'litecoin';

				} else {
					$response['status'] = 'fail';
					$response['print'] = $result;
				}

				break;

			case 'dash':

				//	курс 1 биткоина к доллару
				$currency_btc_to_usd = $settings->get('currency_btc_to_usd');
				//	курс 1 лайткоина к биткоину
				$currency_dash_to_btc = $settings->get('currency_dash_to_btc');

				//	переводим dash -> btc -> usd -> игровая валюта
				$amount_get = round_money($amount_enter / $currency_dash_to_btc * $currency_btc_to_usd / $currency_ratio);

				$replenish_currency = 'DASH';

				$amount_get = format_money($amount_get);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'coinpayments', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();
				
				$m_orderid = $id_of_transaction;
				$m_amount = number_format($amount_enter, 2, '.', '');
				
				$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;

				require_once './classes/coinpayments.php';

				$cps = new CoinPaymentsAPI();
				$cps->Setup($settings_payments->get('coinpayments', 'privatekey'), $settings_payments->get('coinpayments', 'publickey'));

				$request = array(
					'amount' => $amount_enter,
					'currency1' => $replenish_currency,
					'currency2' => $replenish_currency,
					'address' => '',
					'item_name' => $coin,
					'item_desc' => $m_desc,
					'invoice' => $m_orderid,
					'buyer_email' => $user->email,
					'ipn_url' => $root_url.'coinpayments_result.php',
				);
				
				$result = $cps->CreateTransaction($request);
				if ($result['error'] == 'ok') {

					$response['status'] = 'ok';
					$response['print'] = '
						<div class="crypto_replenish_result">
							<div class="success-attr long">
								<div class="success-attr__text">
									<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

									<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

									<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
								</div>
							</div>
						</div>
					'.$timer_script;
					$response['replenish_system'] = 'dash';

				} else {
					$response['status'] = 'fail';
					$response['print'] = $result;
				}

				break;

			case 'doge':

				//	курс 1 биткоина к доллару
				$currency_btc_to_usd = $settings->get('currency_btc_to_usd');
				//	курс 1 лайткоина к биткоину
				$currency_doge_to_btc = $settings->get('currency_doge_to_btc');

				//	переводим doge -> btc -> usd -> игровая валюта
				$amount_get = round_money($amount_enter / $currency_doge_to_btc * $currency_btc_to_usd / $currency_ratio);

				$replenish_currency = 'DOGE';

				$amount_get = format_money($amount_get);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'coinpayments', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();
				
				$m_orderid = $id_of_transaction;
				$m_amount = number_format($amount_enter, 2, '.', '');
				
				$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;

				require_once './classes/coinpayments.php';

				$cps = new CoinPaymentsAPI();
				$cps->Setup($settings_payments->get('coinpayments', 'privatekey'), $settings_payments->get('coinpayments', 'publickey'));

				$request = array(
					'amount' => $amount_enter,
					'currency1' => $replenish_currency,
					'currency2' => $replenish_currency,
					'address' => '',
					'item_name' => $coin,
					'item_desc' => $m_desc,
					'invoice' => $m_orderid,
					'buyer_email' => $user->email,
					'ipn_url' => $root_url.'coinpayments_result.php',
				);
				
				$result = $cps->CreateTransaction($request);

				//	временный костыль, пока биток не работает
				// $result['result']['amount'] = $amount_enter;
				// $result['result']['address'] = 'asdfasdfDmjXsF3nXJawwtjY5F2325m172';

				$response['status'] = 'ok';
				$response['print'] = '
					<div class="crypto_replenish_result">
						<div class="success-attr long">
							<div class="success-attr__text">
								<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

								<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

								<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
							</div>
						</div>
					</div>
				'.$timer_script;
				$response['replenish_system'] = 'doge';
				
				// if ($result['error'] == 'ok') {

				// 	$response['status'] = 'ok';
				// 	$response['print'] = '
				// 		<div class="crypto_replenish_result">
				// 			<div class="success-attr long">
				// 				<div class="success-attr__text">
				// 					<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

				// 					<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

				// 					<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
				// 				</div>
				// 			</div>
				// 		</div>
				// 	'.$timer_script;
				// 	$response['replenish_system'] = 'doge';

				// } else {
				// 	$response['status'] = 'fail';
				// 	$response['print'] = $result;
				// }

				break;

			case 'ethereum':

				//	курс 1 биткоина к доллару
				$currency_btc_to_usd = $settings->get('currency_btc_to_usd');
				//	курс 1 лайткоина к биткоину
				$currency_eth_to_btc = $settings->get('currency_eth_to_btc');

				//	переводим eth -> btc -> usd -> игровая валюта
				$amount_get = round_money($amount_enter / $currency_eth_to_btc * $currency_btc_to_usd / $currency_ratio);

				$replenish_currency = 'ETH';

				$amount_get = format_money($amount_get);

				$create_transaction = $pdo->prepare('INSERT INTO replenishments (user_id, paysystem, currency, amount, amount_get, date_created, date_confirmed, action_percent, fake, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
				$create_transaction->execute(array($user->id, 'coinpayments', $replenish_currency, $amount_enter, $amount_get, time(), 0, $action_percent, $user->fake, 0));

				$id_of_transaction = $pdo->lastInsertId();
				
				$m_orderid = $id_of_transaction;
				$m_amount = number_format($amount_enter, 2, '.', '');
				
				$m_desc = $replenish_description[$user->language]['1'].$m_orderid.$replenish_description[$user->language]['2'].$amount_get.' '.$coin;

				require_once './classes/coinpayments.php';

				$cps = new CoinPaymentsAPI();
				$cps->Setup($settings_payments->get('coinpayments', 'privatekey'), $settings_payments->get('coinpayments', 'publickey'));

				$request = array(
					'amount' => $amount_enter,
					'currency1' => $replenish_currency,
					'currency2' => $replenish_currency,
					'address' => '',
					'item_name' => $coin,
					'item_desc' => $m_desc,
					'invoice' => $m_orderid,
					'buyer_email' => $user->email,
					'ipn_url' => $root_url.'coinpayments_result.php',
				);
				
				$result = $cps->CreateTransaction($request);

				//	временный костыль, пока биток не работает
				// $result['result']['amount'] = $amount_enter;
				// $result['result']['address'] = 'asdfasdf23De1aB189f21c203356468F36537DF8Ba';

				$response['status'] = 'ok';
				$response['print'] = '
					<div class="crypto_replenish_result">
						<div class="success-attr long">
							<div class="success-attr__text">
								<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

								<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

								<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
							</div>
						</div>
					</div>
				'.$timer_script;
				$response['replenish_system'] = 'ethereum';

				// if ($result['error'] == 'ok') {

				// 	$response['status'] = 'ok';
				// 	$response['print'] = '
				// 		<div class="crypto_replenish_result">
				// 			<div class="success-attr long">
				// 				<div class="success-attr__text">
				// 					<p>'.$_txt['crypto_replenish']['amount'].' '.sprintf('%.08f', $result['result']['amount']).' '.$replenish_currency.'</p>

				// 					<p>'.$_txt['crypto_replenish']['address'].' '.$result['result']['address'].'</p>

				// 					<p>'.$_txt['crypto_replenish']['time'].' <span id="crypto_timer" data-time="3600">60:00</span></p>
				// 				</div>
				// 			</div>
				// 		</div>
				// 	'.$timer_script;
				// 	$response['replenish_system'] = 'ethereum';
					
				// } else {
				// 	$response['status'] = 'fail';
				// 	$response['print'] = $result;
				// }

				break;
			
			default:
				$response['status'] = 'fail';
				$response['error'] = 'no_system';
				break;
		}
	} else {
		$response['status'] = 'fail';
		$response['error'] = 'wrong_amount';
	}
} else {
	$response['status'] = 'need_login';
}

echo json_encode($response);