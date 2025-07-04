<?php

require_once '../functions/tickets.php';
require_once '../functions/users.php';

// $tickets = 


if ($_POST['action'] == 'edit') {
	$work_status = 0;

	if (tickets_input_message($_POST['data']['id'], $_POST['data']['text'], 1)) {
		$work_status = 1;
	}

	echo $work_status;
}

if ($_POST['action'] == 'get_page') {
	$ticket_info = $pdo->query('SELECT user_id FROM tickets WHERE id = '.$_POST['id'].' LIMIT 1');
	$ticket_info = $ticket_info->fetch();
	$find_user = users_search_id($ticket_info['user_id']);
	$login = $find_user['login'];

	$ticket = tickets_get_ticket($_POST['id']);
?>
	<p>Логин:
		<span data-edit="users/edit_user" data-id="<?= $ticket_info['user_id']; ?>">
			<?= $login; ?>
		</span>
	</p>
	<div class="ticket">
<?php
	foreach ($ticket['messages'] as $message) {
?>
	<div class="ticket-message" data-answer="<?= $message['is_answer']; ?>">
		<div class="text"><?= $message['message']; ?></div>
		<div class="date"><?= date('d.m.y H:i', $message['date']); ?></div>
	</div>
<?php
	}
?>
	</div>
	<p></p>
	<form class="form-default form-edit" data-callback="loadpage" data-loadpage="other/tickets">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответить</span>
				<textarea class="form-item__input" name="text"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<br><br>
		<input type="hidden" name="id" value="<?= $_POST['id']; ?>">
		<button type="submit" class="button-d">Сохранить</button>
	</form>

<?php
}
?>