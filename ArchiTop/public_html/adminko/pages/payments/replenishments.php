<?php

require_once '../functions/users.php';
require_once '../functions/payments.php';

if ($_POST['action'] == 'set_status') {
	ini_set('display_errors', 1);
	if ($_POST['data']['status'] == 'cancel') {

		payments_set_status($_POST['data']['id'], 0, 'replenishment');

		$get_payment = $pdo->query('SELECT * FROM replenishments WHERE id = '.$_POST['data']['id'].' LIMIT 1');
		$payment = $get_payment->fetch();

		$update_stat = $pdo->query('UPDATE users SET balance_buy = balance_buy - '.$payment['amount_get'].', total_replenishments = total_replenishments - '.$payment['amount_get'].' WHERE id = '.$payment['user_id'].' LIMIT 1');

	} elseif ($_POST['data']['status'] == 'delete') {

		payments_set_status($_POST['data']['id'], 2, 'replenishment');

		$get_payment = $pdo->query('SELECT * FROM replenishments WHERE id = '.$_POST['data']['id'].' LIMIT 1');
		$payment = $get_payment->fetch();

		$update_stat = $pdo->query('UPDATE users SET balance_buy = balance_buy - '.$payment['amount_get'].', total_replenishments = total_replenishments - '.$payment['amount_get'].' WHERE id = '.$payment['user_id'].' LIMIT 1');

	} elseif ($_POST['data']['status'] == 1) {
		payments_mark_payed($_POST['data']['id']);
	} else {
		payments_set_status($_POST['data']['id'], $_POST['data']['status'], 'replenishment');
	}
	echo '1';
}

if ($_POST['action'] == 'get_page') {
	
	$payment_status = 0;
	if (isset($_POST['data']['status'])) {
		$payment_status = $_POST['data']['status'];
	}

	if (!isset($_POST['data']['page']) && !isset($_POST['data']['status'])) {
?>
		<div data-placeholder="result_payments">
<?php
	}

	if ($payment_status == 0) {
?>
		<p>Статус: <a class="get-status-list active" data-status="0" data-result="result_payments">ожидание</a> | <a class="get-status-list" data-status="1" data-result="result_payments">выполнено</a> | <a class="get-status-list" data-status="2" data-result="result_payments">отклонено</a></p>
<?php
	} elseif ($payment_status == 1) {
?>
		<p>Статус: <a class="get-status-list" data-status="0" data-result="result_payments">ожидание</a> | <a class="get-status-list active" data-status="1" data-result="result_payments">выполнено</a> | <a class="get-status-list" data-status="2" data-result="result_payments">отклонено</a></p>
<?php
	} else {
?>
	<p>Статус: <a class="get-status-list" data-status="0" data-result="result_payments">ожидание</a> | <a class="get-status-list" data-status="1" data-result="result_payments">выполнено</a> | <a class="get-status-list active" data-status="2" data-result="result_payments">отклонено</a></p>
<?php
	}

	if (isset($_POST['data']['page'])) {
		$page = $_POST['data']['page'];
	} else {
		$page = 1;
	}

	$payments = payments_get_list('replenishments', $payment_status, $page, 30);
	if ($payments != 'empty') {
?>
		<div class="table-default">
			<div class="table-row table-header">
				<div class="table-column" style="width: 4%">ID</div>
				<div class="table-column" style="width: 18%">Логин</div>
				<div class="table-column" style="width: 10%">Сумма</div>
				<div class="table-column" style="width: 15%">Платежка</div>
				<div class="table-column" style="width: 12%">К получению</div>
				<div class="table-column" style="width: 15%">Дата</div>
				<div class="table-column" style="width: 7%" title="Акция к пополнению на момент создания платежа">Акция</div>
				<!-- <div class="table-column" style="width: 10%">Статус</div> -->
				<div class="table-column" style="width: 10%">Кнопки</div>
			</div>
			<?php
			foreach ($payments['items'] as $key => $value) {
				$find_user = users_search_id($value['user_id']);
				$login = $find_user['login'];
			?>
				<div class="table-row">
					<div class="table-column" style="width: 4%"><?= $value['id']; ?></div>
					<div class="table-column" style="width: 18%">
						<span data-edit="users/edit_user" data-id="<?= $value['user_id']; ?>">
							<?= $login; ?>
						</span>
					</div>
					<div class="table-column" style="width: 10%">
					<?php
						if ($value['currency'] == 'RUB' || $value['currency'] == 'USD') {
							echo number_format($value['amount'], 2, '.', '');
						} else {
							echo number_format($value['amount'], 8, '.', '');
						}
					?>
					</div>
					<div class="table-column" style="width: 15%"><?= $value['currency']; ?>(<?= $value['paysystem']; ?>)</div>
					<div class="table-column" style="width: 12%"><?= $value['amount_get']; ?></div>
					<div class="table-column" style="width: 15%" title="Подтверждено: <?= date('d.m.y H:i', $value['date_confirmed']); ?>"><?= date('d.m.y H:i', $value['date_created']); ?></div>
					<div class="table-column" style="width: 7%"><?= $value['action_percent']; ?></div>
					<!-- <div class="table-column" style="width: 10%"><?= $value['status']; ?></div> -->
					<div class="table-column center" style="width: 10%">
						<?php
							if ($payment_status == 0) {
						?>
								<button class="button-d square" data-set-status="1" data-id="<?= $value['id']; ?>" title="Зачислить на баланс">&#10003;</button>
								<button class="button-d square" data-set-status="2" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Отметить как удалено">&#215;</button>
						<?php
							} elseif ($payment_status == 1) {
						?>
								<button class="button-d square" data-set-status="cancel" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Переместить в ожидание и списать средства">&#8634;</button>
								<button class="button-d square" data-set-status="delete" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Удалить и списать средства">&#215;</button>
						<?php
							} else {
						?>
								<button class="button-d square" data-set-status="0" data-id="<?= $value['id']; ?>" style="font-size: 22px" title="Переместить в ожидание">&#8634;</button>
								<button class="button-d square" data-set-status="1" data-id="<?= $value['id']; ?>" title="Зачислить на баланс">&#10003;</button>
						<?php
							}
						?>
					</div>
				</div>
			<?php
				}
			?>
			<div class="pagination" data-result="result_payments" data-status="<?= $payment_status; ?>">
			<?php
				$pagination = $payments['pagination'];
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
		<p class="description">Таких пополнений нет.</p>
<?php
	}
	if (!isset($_POST['data']['page'])) {
?>
		</div>
<?php
	}
}
?>