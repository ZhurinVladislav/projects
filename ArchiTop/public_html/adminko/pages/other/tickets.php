<?php

//	статусы тикетов:
//	1 - новый тикет, ждёт ответа администратора
//	2 - администратор ответил, ждём реакции пользователя
//	3 - ответ пользователя, ждём ответ администратора
//	4 - тикет закрыт

require_once '../functions/users.php';
require_once '../functions/tickets.php';

	
if ($_POST['action'] == 'delete') {
	$delete = tickets_close_ticket($_POST['id']);
	if ($delete === true) {
		echo 1;
	} else {
		echo 0;
	}
}

if ($_POST['action'] == 'get_page') {
	$status = 1;
	if (isset($_POST['data']['status'])) {
		$status = $_POST['data']['status'];
	}

	if (!isset($_POST['data']['page']) && !isset($_POST['data']['status'])) {
?>
		<div data-placeholder="result_tickets">
<?php
	}

	if ($status == 1) {
?>
		<p>Статус: <a class="get-status-list active" data-status="1" data-result="result_tickets">Новые</a> | <a class="get-status-list" data-status="2" data-result="result_tickets">Отвеченные</a></p>
<?php
	} elseif ($status == 2) {
?>
		<p>Статус: <a class="get-status-list" data-status="1" data-result="result_tickets">Новые</a> | <a class="get-status-list active" data-status="2" data-result="result_tickets">Отвеченные</a></p>
<?php
	}

	if (isset($_POST['data']['page'])) {
		$page = $_POST['data']['page'];
	} else {
		$page = 1;
	}

	$tickets = tickets_get_list($status, $page, 10);
	if ($tickets != 'empty') {
?>
	<div class="table-default">
		<div class="table-row table-header">
			<div class="table-column" style="width: 20%">Логин</div>
			<div class="table-column" style="width: 50%">Вопрос</div>
			<div class="table-column" style="width: 20%">Дата</div>
			<div class="table-column" style="width: 10%">Удалить</div>
		</div>
<?php
		foreach ($tickets['items'] as $key => $value) {
			$find_user = users_search_id($value['user_id']);
			$login = $find_user['login'];
?>
				<div class="table-row">
					<div class="table-column" style="width: 20%">
						<span data-edit="users/edit_user" data-id="<?= $value['user_id']; ?>">
							<?= $login; ?>
						</span>
					</div>
					<div class="table-column" style="width: 50%" data-edit="other/ticket_edit" data-id="<?= $value['id']; ?>"><?= $value['subject']; ?></div>
					<div class="table-column" style="width: 20%"><?= date('d.m.y H:i', $value['date']); ?></div>
					<div class="table-column center" style="width: 10%">
						<button class="button-d square" data-delete="<?= $value['id']; ?>">&#215;</button>
					</div>
				</div>
			<?php
				}
			?>
			<div class="pagination" data-result="result_tickets" data-status="<?= $status; ?>">
			<?php
				$pagination = $tickets['pagination'];
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
		<p class="description">Новых тикетов нет.</p>
<?php
	}
	if (!isset($_POST['data']['page'])) {
?>
		</div>
<?php
	}
}
?>