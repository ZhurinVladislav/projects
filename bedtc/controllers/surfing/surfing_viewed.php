<?php

global $pdo, $coin;
require_once './pages/surfing/'.$user->language.'.php';

//  записываем просмотр
$site_id = (int) $_POST['site_id'];
$update_viewed = $pdo->query('UPDATE surfing SET viewed = viewed + 1 WHERE id = ' . $site_id . ' LIMIT 1');

//  получаем текущий сайт
$get_update_site = $pdo->query('SELECT * FROM surfing WHERE status = 1 AND id = ' . $site_id . ' LIMIT 1');
$update_site = $get_update_site->fetch();

//  Начисляем валюту за просмотр
$pdo->query('UPDATE users SET balance_withdrawal = balance_withdrawal + ' . $update_site['viewcost'] . ' WHERE id = ' . $user->id . ' LIMIT 1');

$get_ref = $pdo->prepare('SELECT * FROM users_referrals WHERE user_id = ? LIMIT 1');
$get_ref->execute(array($user->id));
$referrals = $get_ref->fetch();

if ($referrals['ref_id_first'] > 0) {
	$get_ref_first = $pdo->prepare('SELECT type, auto_ref_back FROM referrals_info WHERE user_id = ? LIMIT 1');
	$get_ref_first->execute(array($referrals['ref_id_first']));
	$ref_first = $get_ref_first->fetch();
	$type_first = (int) $ref_first['type'];
	$auto_ref_back_first = (int) $ref_first['auto_ref_back'];

	//  тип рефки у рефовода
	//  1 - 5%
	//  2 - 7%
	//  3 - 10%
	if ($type_first == 1) {
		$koef_first = 0.05;
	} elseif ($type_first == 2) {
		$koef_first = 0.07;
	} elseif ($type_first == 3) {
		$koef_first = 0.10;
	}

	$money_to_first = format_money(round_money($update_site['viewcost'] * $koef_first));

	//  начисляем реферальные
	$charge_first = $pdo->prepare('UPDATE users SET balance_withdrawal = balance_withdrawal + ? WHERE id = ? LIMIT 1');
	$charge_first->execute(array($money_to_first, $referrals['ref_id_first']));
	$update_ref_info_first = $pdo->prepare('UPDATE referrals_info SET money_earned_first = money_earned_first + ? WHERE user_id = ? LIMIT 1');
	$update_ref_info_first->execute(array($money_to_first, $referrals['ref_id_first']));
	$update_user_ref_info_first = $pdo->prepare('UPDATE users_referrals SET money_to_first = money_to_first + ? WHERE user_id = ? LIMIT 1');
	$update_user_ref_info_first->execute(array($money_to_first, $user->id));

	write_log($referrals['ref_id_first'], '03005', $money_to_first, $user->id);


	//  обновляем реферальный тариф, если возможно

	if ($type_first == 1 || $type_first == 2) {
		$get_ref_first_earned = $pdo->prepare('SELECT money_earned_first FROM referrals_info WHERE user_id = ? LIMIT 1');
		$get_ref_first_earned->execute(array($referrals['ref_id_first']));
		$ref_first_earned = $get_ref_first_earned->fetch();
		if ($type_first == 1) {
			//  здесь примерно 10$
			//  умножаем на 100, потому что 1 BTC = 100 игровых монет
			if ($ref_first_earned >= format_money(0.0002 * 100)) {
				$pdo->query('UPDATE referrals_info SET type = 2 WHERE user_id = '.$referrals['ref_id_first']);
			}
		} elseif ($type_first == 2) {
			//  здесь примерно 50$
			//  умножаем на 100, потому что 1 BTC = 100 игровых монет
			if ($ref_first_earned >= format_money(0.001 * 100)) {
				$pdo->query('UPDATE referrals_info SET type = 3 WHERE user_id = '.$referrals['ref_id_first']);
			}
		}
	}
}

if ($referrals['ref_id_second'] > 0) {
	$get_ref_second = $pdo->prepare('SELECT type FROM referrals_info WHERE user_id = ? LIMIT 1');
	$get_ref_second->execute(array($referrals['ref_id_second']));
	$ref_second = $get_ref_second->fetch();
	$type_second = (int) $ref_second['type'];

	//  тип рефки у рефовода
	//  1 - 3%
	//  2 - 4%
	//  3 - 5%
	if ($type_second == 1) {
		$koef_second = 0.03;
	} elseif ($type_second == 2) {
		$koef_second = 0.04;
	} elseif ($type_second == 3) {
		$koef_second = 0.05;
	}

	$money_to_second = format_money(round_money($update_site['viewcost'] * $koef_second));

	//  начисляем реферальные
	$charge_second = $pdo->prepare('UPDATE users SET balance_withdrawal = balance_withdrawal + ? WHERE id = ? LIMIT 1');
	$charge_second->execute(array($money_to_second, $referrals['ref_id_second']));
	$update_ref_info_second = $pdo->prepare('UPDATE referrals_info SET money_earned_second = money_earned_second + ? WHERE user_id = ? LIMIT 1');
	$update_ref_info_second->execute(array($money_to_second, $referrals['ref_id_second']));
	$update_user_ref_info_second = $pdo->prepare('UPDATE users_referrals SET money_to_second = money_to_second + ? WHERE user_id = ? LIMIT 1');
	$update_user_ref_info_second->execute(array($money_to_second, $user->id));

	write_log($referrals['ref_id_second'], '03006', $money_to_second, $user->id);
}

if ($referrals['ref_id_third'] > 0) {
	$get_ref_third = $pdo->prepare('SELECT type FROM referrals_info WHERE user_id = ? LIMIT 1');
	$get_ref_third->execute(array($referrals['ref_id_third']));
	$ref_third = $get_ref_third->fetch();
	$type_third = (int) $ref_third['type'];
	
	//  тип рефки у рефовода
	//  1 - 3%
	//  2 - 4%
	//  3 - 5%
	if ($type_second == 1) {
		$koef_third = 0.01;
	} elseif ($type_second == 2) {
		$koef_third = 0.015;
	} elseif ($type_second == 3) {
		$koef_third = 0.02;
	}

	$money_to_third = format_money(round_money($update_site['viewcost'] * $koef_third));

	//  начисляем реферальные
	$charge_third = $pdo->prepare('UPDATE users SET balance_withdrawal = balance_withdrawal + ? WHERE id = ? LIMIT 1');
	$charge_third->execute(array($money_to_third, $referrals['ref_id_third']));
	$update_ref_info_third = $pdo->prepare('UPDATE referrals_info SET money_earned_third = money_earned_third + ? WHERE user_id = ? LIMIT 1');
	$update_ref_info_third->execute(array($money_to_third, $referrals['ref_id_third']));
	$update_user_ref_info_third = $pdo->prepare('UPDATE users_referrals SET money_to_third = money_to_third + ? WHERE user_id = ? LIMIT 1');
	$update_user_ref_info_third->execute(array($money_to_third, $user->id));

	write_log($referrals['ref_id_third'], '03007', $money_to_third, $user->id);
}

//  получаем баланс
$select_balances = $pdo->prepare('SELECT balance_buy, balance_withdrawal FROM users WHERE id = ?');
$select_balances->execute(array($user->id));
$balances = $select_balances->fetch();

$response['balance_buy'] = format_money($balances['balance_buy']);
$response['balance_withdrawal'] = format_money($balances['balance_withdrawal']);


//  если кол-во просмотров закончилось, снимаем сайт с публикации
if($update_site['viewed'] >= $update_site['number_viewing']){
	$pdo->query('UPDATE surfing SET status = 0 WHERE id = ' . $site_id . ' LIMIT 1');
}

//  показываем рандомный сайт
$get_site = $pdo->query('SELECT * FROM surfing WHERE status = 1 ORDER BY RAND() LIMIT 1');
$site = $get_site->fetch();

//  Обязательный переход
if($site['mandatory_transition']){
	$mandatory_transition_title = '<div class="control-tugo">' . $_txt['mandatory_transition'] . '</div>';
	$iframe = '
		<div class="iframe-wrap2">
			<div class="nothover"><span>' . $_txt['nothover-text2'] . '</span></div>
			<iframe src=" ' . $site["link_address"] . ' " ></iframe>
		</div>
	';
} else {
	$mandatory_transition_title = '';
	$iframe = '
		<div class="iframe-wrap">
			<div class="nothover"><span>' . $_txt['nothover-text'] . '</span></div>
			<iframe src=" ' . $site["link_address"] . ' " ></iframe>
		</div>
	';
}

$response['content_left'] = '
	' . $mandatory_transition_title . '
	<div class="control-tugo"> ' . $_txt['reward'] . ': ' . number_format($site["viewcost"], 10, '.', '') . ' ' . $coin . '</div>
	<div class="control-tugo">
		<div>' . $_txt['timer'] . ': <span id="time" data-site_id="' . $site["id"] . '">' . $site["time_viewing"] . '</span> ' . $_txt['seconds'] . '</div>
	</div>
';
$response['content_right'] = '
	<a href="' . $site["link_address"] . '" class="button" target="_blank" data-surfing_visited>' . $_txt['control-panel__button1'] . '</a>
	<div class="control-panel__right-wrap">
		<button class="button-invert" data-surfing_skip>' . $_txt['control-panel__button2'] . '</button>
		<button class="btnsmall-invert" data-surfing_complain="' . $site["id"] . '" >
			<span class="icon">
				<svg><use xlink:href="/app/images/svg_sprite.svg#ignore"></use></svg>
			</span>
		</button>
	</div>
';
$response['iframe'] = $iframe;
$response['link_desc'] = $site["link_desc"];

echo json_encode($response);

return;

?>