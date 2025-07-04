<?php

require_once '../functions/users.php';
require_once '../functions/reviews.php';

if ($_POST['action'] == 'get_page_num') {
	$reviews = reviews_get_list($_POST['data']['page'], 10);
	if ($reviews != 'empty') {
?>
		<div class="table-default" data-placeholder="result_reviews">
			<div class="table-row table-header">
				<div class="table-column" style="width: 20%">Логин</div>
				<div class="table-column" style="width: 60%">Отзыв</div>
				<div class="table-column" style="width: 10%">Дата</div>
				<div class="table-column" style="width: 10%">Удалить</div>
			</div>
			<?php
			foreach ($reviews['items'] as $key => $value) {
				$find_user = users_search_id($value['user_id']);
				$login = $find_user['login'];
			?>
				<div class="table-row">
					<div class="table-column" style="width: 20%">
						<span data-edit="users/edit_user" data-id="<?= $value['user_id']; ?>">
							<?= $login; ?>
						</span>
					</div>
					<div class="table-column" style="width: 60%">
						<br>
						<?= stripslashes($value['content']); ?>
						<form class="form-edit" data-action="add_answer" data-callback="reload">
							<br>
						<?php
							if ($value['answer'] !== '') {
						?>
								<button type="button" class="button-d" data-open-form>Показать ответ</button>
						<?php
							} else {
						?>
								<button type="button" class="button-d" data-open-form>Ответить</button>
						<?php
							}
						?>
							<div class="form-hidden-section">
								<br>
								<textarea class="form-item__input" name="text"><?= stripslashes($value['answer']); ?></textarea>
								<input type="hidden" name="id" value="<?= $value['id']; ?>">
								<br>
								<br>
								<button type="submit" class="button-d">Сохранить</button>
							</div>
						</form>
						<br>
					</div>
					<div class="table-column" style="width: 10%"><?= date('d.m.y H:i', $value['date']); ?></div>
					<div class="table-column center" style="width: 10%">
						<button class="button-d square" data-delete="<?= $value['id']; ?>">&#215;</button>
					</div>
				</div>
			<?php
				}
			?>
			<div class="pagination" data-result="result_reviews">
			<?php
				$pagination = $reviews['pagination'];
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
	}
}

if ($_POST['action'] == 'add_answer') {
	$review_id = $_POST['data']['id'];
	$text = clean_string($_POST['data']['text']);
	$write_answer = $pdo->prepare('UPDATE reviews SET answer = ? WHERE id = ?');
	if ($write_answer->execute(array($text, $review_id))) {
		echo 1;
	} else {
		echo 0;
	}
}

if ($_POST['action'] == 'delete') {
	$delete = reviews_delete($_POST['id']);
	if ($delete === true) {
		echo 1;
	} else {
		echo 0;
	}
}

if ($_POST['action'] == 'get_page') {
	if (!isset($_POST['data']['page']) && !isset($_POST['data']['status'])) {
?>
		<div data-placeholder="result_reviews">
<?php
	}

	if (isset($_POST['data']['page'])) {
		$page = $_POST['data']['page'];
	} else {
		$page = 1;
	}

	$reviews = reviews_get_list($page, 10);
	if ($reviews != 'empty') {
?>
		<div class="table-default">
			<div class="table-row table-header">
				<div class="table-column" style="width: 20%">Логин</div>
				<div class="table-column" style="width: 60%">Отзыв</div>
				<div class="table-column" style="width: 10%">Дата</div>
				<div class="table-column" style="width: 10%">Удалить</div>
			</div>
			<?php
			foreach ($reviews['items'] as $key => $value) {
				$find_user = users_search_id($value['user_id']);
				$login = $find_user['login'];
			?>
				<div class="table-row">
					<div class="table-column" style="width: 20%">
						<br>
						<span><?= $login; ?></span>
					</div>
					<div class="table-column" style="width: 60%">
						<br>
						<?= stripslashes($value['content']); ?>
						<form class="form-edit" data-action="add_answer" data-callback="reload">
							<br>
						<?php
							if ($value['answer'] !== '') {
						?>
								<button type="button" class="button-d" data-open-form>Показать ответ</button>
						<?php
							} else {
						?>
								<button type="button" class="button-d" data-open-form>Ответить</button>
						<?php
							}
						?>
							<div class="form-hidden-section">
								<br>
								<textarea class="form-item__input" name="text"><?= stripslashes($value['answer']); ?></textarea>
								<input type="hidden" name="id" value="<?= $value['id']; ?>">
								<br>
								<br>
								<button type="submit" class="button-d">Сохранить</button>
							</div>
						</form>
						<br>
					</div>
					<div class="table-column" style="width: 10%"><br><?= date('d.m.y H:i', $value['date']); ?></div>
					<div class="table-column center" style="width: 10%">
						<button class="button-d square" data-delete="<?= $value['id']; ?>">&#215;</button>
					</div>
				</div>
			<?php
				}
			?>
			<div class="pagination" data-result="result_reviews">
			<?php
				$pagination = $reviews['pagination'];
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
		<p class="description">Опубликованных отзывов нет.</p>
<?php
	}
	if (!isset($_POST['data']['page'])) {
?>
		</div>
<?php
	}
}
?>