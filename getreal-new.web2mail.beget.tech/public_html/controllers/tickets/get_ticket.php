<?php

require_once './functions/users.php';

$ticket_id = (int) $_POST['id'];

if ($user->is_logged()) {
	$find_ticket = $pdo->prepare('SELECT * FROM tickets WHERE id = ?');
	$find_ticket->execute(array($ticket_id));

	if (!is_bool($ticket_info = $find_ticket->fetch())) {
		$_txt = array();
		
		require './pages/tickets/'.$user->language.'.php';

		$tickets_messages = $pdo->prepare('SELECT * FROM tickets_messages WHERE ticket_id = ? ORDER BY id ASC');
		$tickets_messages->execute(array($ticket_id));

		switch ($ticket_info['status']) {
			case '1':
				$status = $_txt['status'][1];
				break;

			case '2':
				$status = $_txt['status'][2];
				break;

			case '3':
				$status = $_txt['status'][3];
				break;
			
			case '4':
				$status = $_txt['status'][4];
				break;
		}
?>
<h1 class="header-external min"><?= $_txt['header'] ?></h1>

<div class="add-header">
	<?= $_txt['dop_header']; ?>
</div>

<div class="container pb25 bg-offset big blue">
	<div class="tickets__theme">
		<div class="stat__table mw nopadding">
			<div class="table__heads">
				<div style="width: 20%">ID</div>
				<div style="width: 50%"><?= $_txt['theme']; ?></div>
				<div style="width: 30%"><?= $_txt['status']['title']; ?></div>
			</div>

			<div class="table__item">
				<div style="width: 20%"><?= $ticket_info['id']; ?></div>
				<div style="width: 50%" class="overflow"><div><?= $ticket_info['subject']; ?></div></div>
				<div style="width: 30%"><?= $status; ?></div>
			</div>
		</div>


		<!-- <button class="back absolute" data-navigation data-href="tickets" data-template="main_inner"><?= $_txt['tickets_btn_close']; ?></button> -->

		<div class="chat mt40">
			<?php
				while ($message = $tickets_messages->fetch()) {
					if ($message['is_answer'] == 1) {
						$current_user = '';
						$sender = 3;
						$find_user = users_search_id(3);

					} else {
						$current_user = 'current_user';
						$sender = $user->id;
						$find_user = users_search_id($user->id);
					}

					if ($find_user['avatar'] != '0') {
						$avatar = '<img src="/images/avatars/'.$find_user['id'].'.'.$find_user['avatar'].'">';

					} else {
						$avatar = '<img src="/app/images/avatar-default.png">';
					}
				?>

				<div class="chat__item <?= $current_user; ?>">
					<div class="chat__item-head">
						<div class="chat__item-head_avatar"><?= $avatar; ?></div>

						<div class="chat__item-head_info">
							<div class="left">
								<div class="login"><?= $find_user['login']; ?></div>
								<div class="level"><?= $_txt['chat']['level']; ?> <?= $find_user['level']; ?></div>
							</div>

							<div class="right">
								<div class="date"><?= date('d.m.y H:i', $message['date']); ?></div>
							</div>
						</div>
					</div>

					<div class="chat__item-body">
						<?php
							$message_text = stripslashes(htmlspecialchars_decode($message['message']));
							$message_text = preg_replace_callback("/__link\((.*?)\)/si", 'print_link', $message_text);
							echo $message_text;
						?>
					</div>
				</div>
	<?php
				if ($message['is_answer'] == 1) {
					$last_sender = 3;
				} else {
					$last_sender = $user->id;
				}
			}

			// echo $array;
	?>
			</div>
		</div>
	<?php
		if ($ticket_info['status'] != 4) {
	?>
			<form class="chat__form form-add" data-controller="tickets/add_message" data-callback="add-ticket-message">
				<div class="chat__form-wrap">
					<div class="chat__form-input">						
						<div class="textarea" id="textarea" name="text" contenteditable></div>
					</div>
				</div>
				<button type="submit" class="chat__form-btn"><?= $_txt['form_button']; ?></button>

				<input name="id" type="hidden" value="<?= $ticket_info['id']; ?>">
			</form>
	<?php
		} else {
	?>
			<div class="error-attr">
				<div class="error-attr__text"><?= $_txt['ticket']['closed']; ?></div>
			</div>
	<?php
		}
	?>
	</div>
</div>
<?php
	}
}
?>
