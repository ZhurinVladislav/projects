<?php

require_once './pages/exchange/'.$user->language.'.php';

$response['status'] = 0;
$response['placeholder'] = 'give_error';

if ($user->is_logged() == true) {
	$amount_give = $_POST['items']['amount'];
	
	if (preg_match('/^([0-9]+)\.[0-9]{1,8}$/', $amount_give) === 1 || preg_match('/^([0-9]+)$/', $amount_give) === 1) {

		$amount_give = format_money(round_money($amount_give));

		if ($amount_give <= $user->balance_withdrawal && $amount_give > 0) {
			$amount_get = format_money(round_money($amount_give * 1.01));

			update_balance($user->id, 'withdrawal', '-', $amount_give);
			update_balance($user->id, 'buy', '+', $amount_get);
			write_log($user->id, '01003', $amount_give);

			$response['status'] = 'ok';
			$response['placeholder'] = 'give_success';

			$select_balances = $pdo->prepare('SELECT balance_buy, balance_withdrawal FROM users WHERE id = ?');
			$select_balances->execute(array($user->id));
			$balances = $select_balances->fetch();

			$response['balance_buy'] = format_money($balances['balance_buy']);
			$response['balance_withdrawal'] = format_money($balances['balance_withdrawal']);

		} else {
			$response['status'] = 'error';
			$response['print'] = $_txt['error']['not_enough_money_withdrawal'];
		}
	} else {
		$response['status'] = 'error';
		$response['print'] = $_txt['error']['wrong_amount'].' '.format_money(1);
	}
}

echo json_encode($response);