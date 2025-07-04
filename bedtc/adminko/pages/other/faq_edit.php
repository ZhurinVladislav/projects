<?php

if ($_POST['action'] == 'edit') {
	
	$item_id = (int) $_POST['id'];
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

	$update_settings = $pdo->prepare('UPDATE faq SET title_ru = ?, title_en = ?, title_de = ?, title_pt = ?, title_es = ?, title_fr = ?, content_ru = ?, content_en = ?, content_de = ?, content_pt = ?, content_es = ?, content_fr = ?, sort = ? WHERE id = ? LIMIT 1');
	if ($update_settings->execute(array($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_th, $title_hi, $title_zh, $content_ru, $content_en, $content_de, $content_pt, $content_es, $content_fr, $content_th, $content_hi, $content_zh, $sort, $item_id)) === true) {
		echo 1;
	} else {
		echo 0;
	}
	
}

if ($_POST['action'] == 'get_page') {

	$item_id = (int) $_POST['id'];
	$get_item = $pdo->query('SELECT * FROM faq WHERE id = '.$item_id.' LIMIT 1');
	$item = $get_item->fetch();

?>
	<code>
		__coin - выведет название игровой валюты (<?= $coin; ?>)<br>
		__site - выведет название сайта (<?= $site_name; ?>)<br>
		__url - выведет url сайта (<?= $root_url; ?>)<br>
		__link('«Рефералы»', 'referrals') - выведет ссылку на страницу <?= $root_url; ?>referrals
	</code>
	<form class="form-default form-edit" data-callback="paint-button">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [ru]</span>
				<input class="form-item__input" type="text" name="title_ru" value="<?= $item['title_ru']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [en]</span>
				<input class="form-item__input" type="text" name="title_en" value="<?= $item['title_en']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [de]</span>
				<input class="form-item__input" type="text" name="title_de" value="<?= $item['title_de']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [pt]</span>
				<input class="form-item__input" type="text" name="title_pt" value="<?= $item['title_pt']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [es]</span>
				<input class="form-item__input" type="text" name="title_es" value="<?= $item['title_es']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [fr]</span>
				<input class="form-item__input" type="text" name="title_fr" value="<?= $item['title_fr']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [th]</span>
				<input class="form-item__input" type="text" name="title_th" value="<?= $item['title_th']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [hi]</span>
				<input class="form-item__input" type="text" name="title_hi" value="<?= $item['title_hi']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Вопрос [zh]</span>
				<input class="form-item__input" type="text" name="title_zh" value="<?= $item['title_zh']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [ru]</span>
				<textarea name="content_ru" class="form-item__input"><?= $item['content_ru']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [en]</span>
				<textarea name="content_en" class="form-item__input"><?= $item['content_en']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [de]</span>
				<textarea name="content_de" class="form-item__input"><?= $item['content_de']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [pt]</span>
				<textarea name="content_pt" class="form-item__input"><?= $item['content_pt']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [es]</span>
				<textarea name="content_es" class="form-item__input"><?= $item['content_es']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [fr]</span>
				<textarea name="content_fr" class="form-item__input"><?= $item['content_fr']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [th]</span>
				<textarea name="content_th" class="form-item__input"><?= $item['content_th']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [hi]</span>
				<textarea name="content_hi" class="form-item__input"><?= $item['content_hi']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ответ [zh]</span>
				<textarea name="content_zh" class="form-item__input"><?= $item['content_zh']; ?></textarea>
				<span class="form-item__description">Ссылка на раздел - __link('«Рефералы»', 'referrals')</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Порядковый номер</span>
				<input class="form-item__input" type="text" name="sort" value="<?= $item['sort']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<br><br>
		<input type="hidden" name="id" value="<?= $_POST['id']; ?>" disabled>
		<button type="submit" class="button-d">Сохранить</button>
	</form>

<?php

}

?>