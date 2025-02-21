<?php

if ($_POST['action'] == 'edit') {
	$markup_en = trim(addslashes($_POST['data']['markup_en']));
	$markup_ru = trim(addslashes($_POST['data']['markup_ru']));
	$markup_de = trim(addslashes($_POST['data']['markup_de']));
	$markup_pt = trim(addslashes($_POST['data']['markup_pt']));
	$markup_es = trim(addslashes($_POST['data']['markup_es']));
	$update_page = $pdo->prepare('UPDATE pages SET markup_en = ?, markup_ru = ?, markup_de = ?, markup_pt = ?, markup_es = ? WHERE id = 1 LIMIT 1');
	if ($update_page->execute(array($markup_en, $markup_ru, $markup_de, $markup_pt, $markup_es))) {
		echo 1;
	}
}

if ($_POST['action'] == 'get_page') {
	$get_content = $pdo->query('SELECT * FROM pages WHERE id = 1 LIMIT 1');
	$content = $get_content->fetch();
?>

	<code>
		__coin - выведет название игровой валюты (<?= $coin; ?>)<br>
		__site - выведет название сайта (<?= $site_name; ?>)<br>
		__url - выведет url сайта (<?= $root_url; ?>)<br>
		__link('«Рефералы»', 'referrals') - выведет ссылку на страницу <?= $root_url; ?>referrals
	</code>
	<form class="form-default form-edit" data-page-handler="other/terms" data-callback="paint-button">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Разметка [en]</span>
				<textarea name="markup_en" class="form-item__input"><?= stripslashes($content['markup_en']); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Разметка [ru]</span>
				<textarea name="markup_ru" class="form-item__input"><?= stripslashes($content['markup_ru']); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Разметка [de]</span>
				<textarea name="markup_de" class="form-item__input"><?= stripslashes($content['markup_de']); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Разметка [pt]</span>
				<textarea name="markup_pt" class="form-item__input"><?= stripslashes($content['markup_pt']); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Разметка [es]</span>
				<textarea name="markup_es" class="form-item__input"><?= stripslashes($content['markup_es']); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<br><br>
		<button type="submit" class="button-d">Сохранить</button>
		<br><br>
		<br><br>
	</form>

<?php
}
?>