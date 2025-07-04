<?php

require_once '../functions/faq.php';

if ($_POST['action'] == 'add') {
	$work_status = 0;

	$title_ru = $_POST['data']['title_ru'];
	$title_en = $_POST['data']['title_en'];
	$title_de = $_POST['data']['title_de'];
	$title_pt = $_POST['data']['title_pt'];
	$title_es = $_POST['data']['title_es'];
	$title_fr = $_POST['data']['title_fr'];
	$title_th = $_POST['data']['title_th'];
	$title_hi = $_POST['data']['title_hi'];
	$title_zh = $_POST['data']['title_zh'];
	$content_ru = $_POST['data']['content_ru'];
	$content_en = $_POST['data']['content_en'];
	$content_de = $_POST['data']['content_de'];
	$content_pt = $_POST['data']['content_pt'];
	$content_es = $_POST['data']['content_es'];
	$content_fr = $_POST['data']['content_fr'];
	$content_th = $_POST['data']['content_th'];
	$content_hi = $_POST['data']['content_hi'];
	$content_zh = $_POST['data']['content_zh'];
	$sort = $_POST['data']['sort'];

	if (faq_add_item($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_th, $title_hi, $title_zh, $content_ru, $content_en, $content_de, $content_pt, $content_es, $content_fr, $content_th, $content_hi, $content_zh, $sort)) {
		$work_status = 1;
	}
	echo $work_status;
}

if ($_POST['action'] == 'delete') {

	$item_id = (int) $_POST['id'];

	if ($delete_review = $pdo->query('DELETE FROM faq WHERE id = '.$item_id.' LIMIT 1') !== false) {
		echo 1;
	} else {
		echo 0;
	}
}

if ($_POST['action'] == 'get_page') {
?>

<form class="form-default form-add" data-page-handler="other/faq">
	<button type="button" class="button-d" data-open-form>Добавить</button>
	<div class="form-hidden-section">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [ru]</span>
				<input class="form-item__input" type="text" name="title_ru">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [en]</span>
				<input class="form-item__input" type="text" name="title_en">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [de]</span>
				<input class="form-item__input" type="text" name="title_de">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [pt]</span>
				<input class="form-item__input" type="text" name="title_pt">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [es]</span>
				<input class="form-item__input" type="text" name="title_es">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [fr]</span>
				<input class="form-item__input" type="text" name="title_fr">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [th]</span>
				<input class="form-item__input" type="text" name="title_th">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [hi]</span>
				<input class="form-item__input" type="text" name="title_hi">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [zh]</span>
				<input class="form-item__input" type="text" name="title_zh">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [ru]</span>
				<textarea name="content_ru" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [en]</span>
				<textarea name="content_en" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [de]</span>
				<textarea name="content_de" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [pt]</span>
				<textarea name="content_pt" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [es]</span>
				<textarea name="content_es" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [fr]</span>
				<textarea name="content_fr" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [th]</span>
				<textarea name="content_th" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [hi]</span>
				<textarea name="content_hi" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [zh]</span>
				<textarea name="content_zh" class="form-item__input"></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Порядковый номер</span>
				<input class="form-item__input" type="text" name="sort" value="auto">
				<span class="form-item__description"></span>
			</label>
		</div>
		<br><br>
		<button type="submit" class="button-d">Сохранить</button>
		<br><br>
		<hr>
	</div>
	<br><br>
</form>

<div class="table-default">
	<div class="table-row table-header">
		<div class="table-column" style="width: 80%">Заголовок</div>
		<div class="table-column" style="width: 10%">Порядок</div>
		<div class="table-column" style="width: 10%">Удалить</div>
	</div>
	<?php
		$list = faq_get_list();
		
		foreach ($list as $key => $value) {
	?>
		<div class="table-row">
			<div class="table-column" style="width: 80%">
				<span data-edit="other/faq_edit" data-id="<?= $value['id']; ?>"><?= $value['title_ru']; ?></span>
			</div>
			<div class="table-column center" style="width: 10%"><?= $value['sort']; ?></div>
			<div class="table-column center" style="width: 10%">
				<button class="button-d square" data-delete="<?= $value['id']; ?>">&#215;</button>
			</div>
		</div>
	<?php
		}
	?>
</div>

<?php
}
?>