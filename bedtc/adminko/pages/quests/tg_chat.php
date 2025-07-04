<?php

require_once '../functions/users.php';
require_once '../functions/quests.php';

if ($_POST['action'] == 'accept') {

	$item_id = (int) $_POST['data']['id'];
	$reward = format_money($_POST['data']['reward']);

	if ($reward == 0.00000100) {

		if ($accept_quest = $pdo->query('UPDATE quest_tg_chat SET status = 1, date_confirm = '.time().' WHERE id = '.$item_id.' LIMIT 1') !== false) {
			$get_user_id = $pdo->query('SELECT user_id FROM quest_tg_chat WHERE id = '.$item_id.' LIMIT 1');
			$get_user_id = $get_user_id->fetch();

			update_balance($get_user_id['user_id'], 'buy', '+', $reward);
			write_log($get_user_id['user_id'], '04031', $reward);
			echo 1;
		} else {
			echo 0;
		}
	} else {
		echo 0;
	}
}

if ($_POST['action'] == 'reject') {

	$item_id = (int) $_POST['data']['id'];

	if ($accept_quest = $pdo->query('UPDATE quest_tg_chat SET status = 2 WHERE id = '.$item_id.' LIMIT 1') !== false) {
		echo 1;
	} else {
		echo 0;
	}
}

if ($_POST['action'] == 'get_page') {
	$quest_status = 0;
	if (isset($_POST['data']['status'])) {
		$quest_status = $_POST['data']['status'];
	}

	if (!isset($_POST['data']['page']) && !isset($_POST['data']['status'])) {
?>
		Выдаем награды в размере 0.00000100 <?= $coin; ?>
		<br><br>
		<div data-placeholder="result_quests">
<?php
	}

	if ($quest_status == 0) {
?>
		<p>Статус: <a class="get-status-list active" data-status="0" data-result="result_quests">ожидание</a> | <a class="get-status-list" data-status="1" data-result="result_quests">выполнено</a> | <a class="get-status-list" data-status="2" data-result="result_quests">отклонено</a></p>
<?php
	} elseif ($quest_status == 1) {
?>
		<p>Статус: <a class="get-status-list" data-status="0" data-result="result_quests">ожидание</a> | <a class="get-status-list active" data-status="1" data-result="result_quests">выполнено</a> | <a class="get-status-list" data-status="2" data-result="result_quests">отклонено</a></p>
<?php
	} else {
?>
		<p>Статус: <a class="get-status-list" data-status="0" data-result="result_quests">ожидание</a> | <a class="get-status-list" data-status="1" data-result="result_quests">выполнено</a> | <a class="get-status-list active" data-status="2" data-result="result_quests">отклонено</a></p>
<?php
	}

	if (isset($_POST['data']['page'])) {
		$page = $_POST['data']['page'];
	} else {
		$page = 1;
	}
	$quests = quests_get_list('tg_chat', $quest_status, $page, 30);
	if ($quests != 'empty') {
?>
		<div class="table-default">
			<div class="table-row table-header">
				<div class="table-column" style="width: 10%">Логин</div>
				<div class="table-column" style="width: 30%">Ник</div>
				<div class="table-column" style="width: 30%">Чат</div>
				<div class="table-column" style="width: 20%">Кнопки</div>
			</div>
			<?php
			foreach ($quests['items'] as $key => $value) {
				$find_user = users_search_id($value['user_id']);
				$login = $find_user['login'];
				$chat = $find_user['language'];
			?>
				<div class="table-row">
					<div class="table-column" style="width: 10%">
						<span data-edit="users/edit_user" data-id="<?= $value['user_id']; ?>">
							<?= $login; ?>
						</span>
					</div>
					<div class="table-column" style="width: 30%">
						<?= stripslashes(htmlspecialchars_decode($value['link'])); ?>
					</div>
					<div class="table-column" style="width: 30%">
						<?= $chat; ?>
					</div>
					<div class="table-column center" style="width: 20%">
					<?php
						if ($quest_status == 0) {
					?>
							<form data-accept-quest="<?= $value['id']; ?>">
								<input class="form-item__input" type="text" name="reward" style="width: 110px; height: 28px" value="0.00000100" disabled>
								<button class="button-d square">&#10003;</button>
							</form>
							<button class="button-d square" data-reject-quest="<?= $value['id']; ?>">&#215;</button>
					<?php
						} elseif ($quest_status == 1) {
					?>
							<!-- <button class="button-d square" data-set-status="0" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Переместить в ожидание">&#8634;</button>
							<button class="button-d square" data-set-status="2" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Отметить как удалено">&#215;</button> -->
					<?php
						} else {
					?>
							<!-- <button class="button-d square" data-set-status="0" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Переместить в ожидание">&#8634;</button>
							<button class="button-d square" data-set-status="1" data-id="<?= $value['id']; ?>" title="Отметить как выполнено">&#10003;</button> -->
					<?php
						}
					?>
					</div>
				</div>
			<?php
				}
			?>
			<div class="pagination" data-result="result_quests" data-status="<?= $quest_status; ?>">
			<?php
				$pagination = $quests['pagination'];
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
		<p class="description">Ничего не найдено.</p>
<?php
	}
	if (!isset($_POST['data']['page'])) {
?>
		</div>
<?php
	}
?>
<?php
}
?>