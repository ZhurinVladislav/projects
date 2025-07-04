<?php

require_once '../functions/news.php';

if ($_POST['action'] != 'get_page') {
	if ($_POST['action'] == 'add') {

		$title_ru = $_POST['data']['title_ru'];
		$title_en = $_POST['data']['title_en'];
		$title_de = $_POST['data']['title_de'];
		$title_pt = $_POST['data']['title_pt'];
		$title_es = $_POST['data']['title_es'];
		$title_fr = $_POST['data']['title_fr'];
		$title_hi = $_POST['data']['title_hi'];
		$title_id = $_POST['data']['title_id'];
		$title_th = $_POST['data']['title_th'];
		$title_tr = $_POST['data']['title_tr'];
		$title_zh = $_POST['data']['title_zh'];
		$content_ru = $_POST['data']['content_ru'];
		$content_en = $_POST['data']['content_en'];
		$content_de = $_POST['data']['content_de'];
		$content_pt = $_POST['data']['content_pt'];
		$content_es = $_POST['data']['content_es'];
		$content_fr = $_POST['data']['content_fr'];
		$content_hi = $_POST['data']['content_hi'];
		$content_id = $_POST['data']['content_id'];
		$content_th = $_POST['data']['content_th'];
		$content_tr = $_POST['data']['content_tr'];
		$content_zh = $_POST['data']['content_zh'];
		$image = $_POST['data']['image'];
		$admin_only = $_POST['data']['admin_only'];

		if (news_add_item($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_hi, $title_id, $title_th, $title_tr, $title_zh, $content_ru, $content_en, $content_de, $content_pt, $content_es, $content_fr, $content_hi, $content_id, $content_th, $content_tr, $content_zh, $image, $admin_only)) {

			echo 1;

		} else {
			echo 0;
		}
	}
} else {
	$get_new_id = $pdo->query('SELECT id FROM news ORDER BY id DESC LIMIT 1');
	$new_id = $get_new_id->fetch();
	$new_id = $new_id['id'] + 1;
?>

<form class="form-default form-add" data-page-handler="other/news">
	<button type="button" class="button-d" data-open-form>Добавить</button>
	<div class="form-hidden-section">
		<div class="form-item form-item-item">
			<label>
				<span class="form-item__header">Картинка</span>
				<input class="form-item__input" type="file" name="image" data-save-path="images/news" data-id="<?= $new_id; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [ru]</span>
				<input class="form-item__input" type="text" name="title_ru">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [en]</span>
				<input class="form-item__input" type="text" name="title_en">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [de]</span>
				<input class="form-item__input" type="text" name="title_de">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [pt]</span>
				<input class="form-item__input" type="text" name="title_pt">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [es]</span>
				<input class="form-item__input" type="text" name="title_es">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [fr]</span>
				<input class="form-item__input" type="text" name="title_fr">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [hi]</span>
				<input class="form-item__input" type="text" name="title_hi">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [id]</span>
				<input class="form-item__input" type="text" name="title_id">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [th]</span>
				<input class="form-item__input" type="text" name="title_th">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [tr]</span>
				<input class="form-item__input" type="text" name="title_tr">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [zh]</span>
				<input class="form-item__input" type="text" name="title_zh">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [ru]</span>
				<textarea name="content_ru" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [en]</span>
				<textarea name="content_en" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [de]</span>
				<textarea name="content_de" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [pt]</span>
				<textarea name="content_pt" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [es]</span>
				<textarea name="content_es" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [fr]</span>
				<textarea name="content_fr" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [hi]</span>
				<textarea name="content_hi" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [id]</span>
				<textarea name="content_id" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [th]</span>
				<textarea name="content_th" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [tr]</span>
				<textarea name="content_tr" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [zh]</span>
				<textarea name="content_zh" class="form-item__input"></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-checkbox">
			<label>
				<span class="form-item__header">Только для админа</span>
				<input class="form-item__input" type="checkbox" value="0" name="admin_only">
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
		<div class="table-column" style="width: 20%">Только для админа</div>
	</div>
	<?php
		$list = news_get_list(1, 100);

		if ($list != 'empty') {
		
			foreach ($list['items'] as $key => $value) {
	?>
				<div class="table-row">
					<div class="table-column" style="width: 80%">
						<span data-edit="other/news_edit" data-id="<?= $value['id']; ?>"><?= $value['title_ru']; ?></span>
					</div>
					<div class="table-column" style="width: 20%"><?= $value['admin_only']; ?></div>
				</div>
	<?php
			}
		}
	?>
</div>

<?php
}
?>