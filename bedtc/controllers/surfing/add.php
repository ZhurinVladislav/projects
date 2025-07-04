<?php

require_once './pages/attract/'.$user->language.'.php';
require_once './functions/payments.php';

$response['status'] = 0;

if ($user->is_logged() == true && $user->can_communicate == 1) {

    $link_name = $_POST['items']['link_name'];
    $link_address = $_POST['items']['link_address'];
    $tariff = $_POST['items']['tariff'];
	$time_placement = "";
	$number_viewing = $_POST['items']['number_viewing'];
	$time_viewing = $_POST['items']['time_viewing'];
	$language = $_POST['items']['language'];
	$mandatory_transition = $_POST['items']['mandatory_transition'] ? $_POST['items']['mandatory_transition'] : 0;
	$material = $_POST['items']['material'] ? $_POST['items']['material'] : 0;
	
	//$viewcost = $_POST['items']['viewcost'];
	//$allcost = $_POST['items']['allcost'];

	/* расчет стоимости */
	$timeViewingCost = 0;
	$mandatoryTransitionCost = 0;
	switch ($time_viewing) {
		case 10:
			$timeViewingCost = 0.00340000  / 1000;
			break;

		case 30:
			$timeViewingCost = 0.00500000  / 1000;
			break;

		case 60:
			$timeViewingCost = 0.00690000 / 1000;
			break;

		case 90:
			$timeViewingCost = 0.00850000 / 1000;
			break;

		case 120:
			$timeViewingCost = 0.01000000 / 1000;
			break;

		case 180:
			$timeViewingCost = 0.01100000 / 1000;
			break;
	}
	if ($mandatory_transition){
		$mandatoryTransitionCost = $timeViewingCost * 0.25;
	} 

	$viewcost = format_money( ($timeViewingCost + $mandatoryTransitionCost) / 2 );
	$allcost = format_money( $viewcost * $number_viewing * 2 );	

	/* конец расчет стоимости */


	$status = ($_POST['button'] == 'save') ? 0 : 1;
	
	// Если нажимаем сохранить,то обнулям счетчик показов
	$number_viewing = ($_POST['button'] == 'save') ? 0 : $number_viewing;

	// клик по кнопке опубликовать
	if($_POST['button'] == 'submit'){

		// если баланса не достаточно, то ошибка
		if((float)$user->balance_buy < (float)$allcost){
			//$response['status'] = 'fail';

			$response['status'] = 'error';
			$response['placeholder'] = 'balance_buy';
			$response['print'] = $_txt['balance_buy'];
			echo json_encode($response);
			return;
		}

		// отнимаем валюту за публикацию
		$update_balance = $pdo->query('UPDATE users SET balance_buy = balance_buy - ' . $allcost . ' WHERE id = ' . $user->id . ' LIMIT 1');

		write_log($user->id, '05001', $allcost);
	}
	
	// time_placement , number_viewing , time_viewing , language , mandatory_transition , material

	$link_desc = addslashes(
		htmlspecialchars(
			html_remove_attributes(
				strip_tags(
					htmlspecialchars_decode(
						trim(
							$_POST['items']['link_desc']
						)
					), '<br>'
				), ['src']
			)
		)
	);

	if ($link_name != '' && $link_address != '' && $link_desc != '') {
		$add_review = $pdo->prepare('INSERT INTO surfing (user_id, link_name, link_desc, link_address, tariff, time_placement, number_viewing, time_viewing, language, mandatory_transition, material, status, date, viewcost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		if ($add_review->execute(array($user->id, $link_name, $link_desc, $link_address, $tariff, $time_placement, $number_viewing, $time_viewing, $language, $mandatory_transition, $material, $status, time(), $viewcost))) {
			$response['status'] = 'ok';
			$response['print'] = '
				<div class="success-attr">
					<div class="success-attr__text">'.$_txt['send_review_success'].'</div>
				</div>
			';
			$response['redirect_to'] = 'place-task#task';
		}
	} else {
		$response['status'] = 'fail';
	}
}

echo json_encode($response);