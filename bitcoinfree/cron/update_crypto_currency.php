<?php

define('ENGINE', true);

//	данный скрипт обновляет курсы криптовалют в системе
//	рекомендуется запускать по крону каждую минуту

//	подключаем конфиг и коннектимся к базе
require_once dirname(dirname(__FILE__)).'/config.php';
global $pdo;
require_once dirname(dirname(__FILE__)).'/database.php';

//	подключаем дефолтные функции и классы
require_once dirname(dirname(__FILE__)).'/classes/settings.php';
global $settings, $settings_payments;

$settings = new settings();
$settings_payments = new settings_payments();


$file = file_get_contents('https://blockchain.info/ru/ticker');
$array = json_decode($file, true);

$currency_btc_to_usd = number_format($array['USD']['15m'], 2, '.', '');
if ($settings->update('currency_btc_to_usd', $currency_btc_to_usd) === true && $settings->update('currency_ratio', $currency_btc_to_usd) === true) {
	echo 'курс биткоина к доллару успешно обновлён<br>';
} else {
	echo 'при обновлении курса биткоина к доллару возникла ошибка<br>';
}

if ($settings->update('currency_usd_to_btc', number_format(1 / $array['USD']['15m'], 8, '.', '')) === true) {
	echo 'курс доллара к биткоину успешно обновлён<br>';
} else {
	echo 'при обновлении курса доллара к биткоину возникла ошибка<br>';
}

if ($settings->update('currency_btc_to_rub', number_format($array['RUB']['15m'], 2, '.', '')) === true) {
	echo 'курс биткоина к рублю успешно обновлён<br>';
} else {
	echo 'при обновлении курса биткоина к рублю возникла ошибка<br>';
}

if ($settings->update('currency_rub_to_btc', number_format(1 / $array['RUB']['15m'], 8, '.', '')) === true) {
	echo 'курс рубля к биткоину успешно обновлён<br>';
} else {
	echo 'при обновлении курса рубля к биткоину возникла ошибка<br>';
}

//	обновляем альткоины через coinpayments api
//	если нужна ещё одна монета - добавь её в массив ниже
$alt_array = array(
	'LTC',
	'DOGE',
	'DASH',
	// 'XMR', - почему-то coinpayments перестал работать с monero
	'ETH'
);

require_once dirname(dirname(__FILE__)).'/classes/coinpayments.php';

$cps = new CoinPaymentsAPI();
$cps->Setup($settings_payments->get('coinpayments', 'privatekey'), $settings_payments->get('coinpayments', 'publickey'));

$result = $cps->GetRates();
if ($result['error'] == 'ok') {
	foreach ($result['result'] as $coin => $rate) {
		if (in_array($coin, $alt_array)) {
			$currency = 1 / $rate['rate_btc'];
			$currency = number_format(round($currency, 8),  8, '.', '');

			$settings->update('currency_'.mb_strtolower($coin).'_to_btc', $currency);

			echo 'курс '.$coin.' к биткоину успешно обновлён<br>';
		}
	}
} else {
	print 'Error: '.$result['error']."\n";
}