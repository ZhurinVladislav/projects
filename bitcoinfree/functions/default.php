<?php

function clean_string($str) {
	return addslashes(htmlspecialchars(trim($str)));
}

function html_remove_attributes($text, $allowed = []) {
	$attributes = implode('|', $allowed);
	$reg = '/(<[\w]+)([^>]*)(>)/i';
	$text = preg_replace_callback(
		$reg,
		function ($matches) use ($attributes) {
			// Если нет разрешенных атрибутов, возвращаем пустой тег
			if (!$attributes) {
				return $matches[1] . $matches[3];
			}

			$attr = $matches[2];
			$reg = '/(' . $attributes . ')="[^"]*"/i';
			preg_match_all($reg, $attr, $result);
			$attr = implode(' ', $result[0]);
			$attr = ($attr ? ' ' : '') . $attr;

			return $matches[1] . $attr . $matches[3];
		},
		$text
	);

	return $text;
}

function format_money($money) {
	global $settings, $surf_tarrifs;
	return number_format(floatval($money), $settings->get('money_accuracy'), '.', '');
}

function round_money($money) {
	global $settings, $surf_tarrifs;
	return round($money, $settings->get('money_accuracy'));
}

//	$balance может быть 'buy' или 'withdrawal';
//	$operation может быть '+' или '-';
function update_balance(int $user_id, $balance, $operation, $sum) {
	global $pdo;

	$sum = format_money(round_money($sum));

	if ($pdo->query('UPDATE users SET balance_'.$balance.' = balance_'.$balance.' '.$operation.' '.$sum.' WHERE id = '.$user_id.' LIMIT 1') !== false ) {
		// if ($balance == 'buy') {
		// 	$get_balance = $pdo->query('SELECT balance_buy FROM users WHERE id = '.$user_id.' LIMIT 1');
		// 	$balance_buy = $get_balance->fetch();
		// 	$balance_buy = $balance_buy['balance_buy'];

		// 	$get_business = $pdo->query('SELECT * FROM business WHERE price <= '.$balance_buy.'')
		// }
		return true;
	} else {
		return false;
	}
}

//	список кодов: см /config.php
function write_log(int $user_id, string $code, $money, $info = '') {
	global $pdo, $allowed_ips;

	$select_balances = $pdo->prepare('SELECT balance_buy, balance_withdrawal FROM users WHERE id = ?');
	$select_balances->execute(array($user_id));
	$balances = $select_balances->fetch();

	$insert_log = $pdo->prepare('INSERT INTO users_logs (user_id, date, code, money, info, balance_buy, balance_withdrawal, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

	//	если ip, с которого разрешен доступ в адмику, пишет логи, то пишем пустую строку
	if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
		$ipaddr = $_SERVER['REMOTE_ADDR'];
	} else {
		$ipaddr = '';
	}
	$data = array(
		$user_id,
		time(),
		$code,
		format_money(round_money($money)),
		$info,
		$balances['balance_buy'],
		$balances['balance_withdrawal'],
		$ipaddr
	);

	if ($insert_log->execute($data)) {
		return true;
	} else {
		return false;
	}
}

function print_money($arr) {
	global $settings, $coin;
	
	return number_format(floatval($arr[1]), $settings->get('money_accuracy'), '.', '') . '&nbsp;' . $coin;
}

function print_link($arr) {
	$arr[1] = str_replace('\'', '', $arr[1]);
	$link = preg_split('/^(.*),/', $arr[1]);
	$title = preg_split('/,(.*)$/', $arr[1]);

	$str = '<a href="'.trim($link[1]).'">';
	$str .= trim($title[0]);
	$str .= '</a>';
	return $str;
}

function print_help_text($path) {
	global $pdo, $user, $coin, $site_name, $root_url;

	if (stripos($path, 'pages/') !== false) {
		$link = mb_substr($path, 6);
	} else {
		$link = $path;
	}

	$get_help_text = $pdo->prepare('SELECT * FROM help_text WHERE link LIKE ? LIMIT 1');
	$get_help_text->execute(array($link));

	$help_text = $get_help_text->fetch();


	$text = stripslashes($help_text['text_'.$user->language]);
	$text = str_ireplace('__coin', $coin, $text);
	$text = str_ireplace('__site', $site_name, $text);
	$text = str_ireplace('__url', '<a href="'.$root_url.'">'.$root_url.'</a>', $text);
	$text = preg_replace_callback("/__money\((.*?)\)/si", 'print_money', $text);
	$text = preg_replace_callback("/__link\((.*?)\)/si", 'print_link', $text);

	
	echo $text;
}

function draw_user($id, $login = '', $level = '', $avatar = '') {
	global $user, $_txt_default;

	if ($login == '' || $level == '' || $avatar == '') {
		$arr = users_search_id($id, 'login, level, avatar');
		$login = $arr['login'];
		$level = $arr['level'];
		$avatar = $arr['avatar'];
	}

	if ($avatar != '0') {
		$avatar_path = '/images/avatars/'.$id.'.'.$avatar;
	} else {
		$avatar_path = '/app/images/avatar-default.png';
	}

	return '
		<div class="user-block">
			<span class="avatar" style="background-image: url('.$avatar_path.');"></span>
			<span class="wrap">
				<a>'.$login.'</a>
				<span class="level">'.$level.'&nbsp;'.$_txt_default[$user->language]['level'].'</span>
			</span>
		</div>
	';
}