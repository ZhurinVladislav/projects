<?php

if ($_POST['action'] == 'edit') {
	
	$item_id = (int) $_POST['id'];
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
	$annotation_ru = $_POST['data']['annotation_ru'];
	$annotation_en = $_POST['data']['annotation_en'];
	$annotation_de = $_POST['data']['annotation_de'];
	$annotation_pt = $_POST['data']['annotation_pt'];
	$annotation_es = $_POST['data']['annotation_es'];
	$annotation_fr = $_POST['data']['annotation_fr'];
	$annotation_hi = $_POST['data']['annotation_hi'];
	$annotation_id = $_POST['data']['annotation_id'];
	$annotation_th = $_POST['data']['annotation_th'];
	$annotation_tr = $_POST['data']['annotation_tr'];
	$annotation_zh = $_POST['data']['annotation_zh'];
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

	$admin_only = $_POST['data']['admin_only'];

	$contents_text = array(
		'ru' => $content_ru,
		'en' => $content_en,
		'de' => $content_de,
		'pt' => $content_pt,
		'es' => $content_es,
		'fr' => $content_fr,
		'hi' => $content_hi,
		'id' => $content_id,
		'th' => $content_th,
		'tr' => $content_tr,
		'zh' => $content_zh
	);

	$update_news = $pdo->prepare('UPDATE news SET title_ru = ?, title_en = ?, title_de = ?, title_pt = ?, title_es = ?, title_fr = ?, title_hi = ?, title_id = ?, title_th = ?, title_tr = ?, title_zh = ?, annotation_ru = ?, annotation_en = ?, annotation_de = ?, annotation_pt = ?, annotation_es = ?, annotation_fr = ?, annotation_hi = ?, annotation_id = ?, annotation_th = ?, annotation_tr = ?, annotation_zh = ?, admin_only = ? WHERE id = ? LIMIT 1');

	if ($update_news->execute(array($title_ru, $title_en, $title_de, $title_pt, $title_es, $title_fr, $title_hi, $title_id, $title_th, $title_tr, $title_zh, $annotation_ru, $annotation_en, $annotation_de, $annotation_pt, $annotation_es, $annotation_fr, $annotation_hi, $annotation_id, $annotation_th, $annotation_tr, $annotation_zh, $admin_only, $item_id)) === true) {

		file_put_contents('../pages/news/items/news' . $item_id . '.json', json_encode($contents_text));
		echo 1;

	} else {
		echo 0;
	}
	
}

if ($_POST['action'] == 'get_page') {

	$item_id = (int) $_POST['id'];
	$get_item = $pdo->query('SELECT * FROM news WHERE id = '.$item_id.' LIMIT 1');
	$item = $get_item->fetch();

	$contents_text = json_decode(file_get_contents('../pages/news/items/news' . $item_id . '.json'), true);

?>

	<form class="form-default form-edit" data-callback="paint-button">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [ru]</span>
				<input class="form-item__input" type="text" name="title_ru" value="<?= $item['title_ru']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [en]</span>
				<input class="form-item__input" type="text" name="title_en" value="<?= $item['title_en']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [de]</span>
				<input class="form-item__input" type="text" name="title_de" value="<?= $item['title_de']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [pt]</span>
				<input class="form-item__input" type="text" name="title_pt" value="<?= $item['title_pt']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [es]</span>
				<input class="form-item__input" type="text" name="title_es" value="<?= $item['title_es']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [fr]</span>
				<input class="form-item__input" type="text" name="title_fr" value="<?= $item['title_fr']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [hi]</span>
				<input class="form-item__input" type="text" name="title_hi" value="<?= $item['title_hi']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [id]</span>
				<input class="form-item__input" type="text" name="title_id" value="<?= $item['title_id']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [th]</span>
				<input class="form-item__input" type="text" name="title_th" value="<?= $item['title_th']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [tr]</span>
				<input class="form-item__input" type="text" name="title_tr" value="<?= $item['title_tr']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Заголовок [zh]</span>
				<input class="form-item__input" type="text" name="title_zh" value="<?= $item['title_zh']; ?>">
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [ru]</span>
				<textarea name="annotation_ru" class="form-item__input"><?= $item['annotation_ru']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [en]</span>
				<textarea name="annotation_en" class="form-item__input"><?= $item['annotation_en']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [de]</span>
				<textarea name="annotation_de" class="form-item__input"><?= $item['annotation_de']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [pt]</span>
				<textarea name="annotation_pt" class="form-item__input"><?= $item['annotation_pt']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [es]</span>
				<textarea name="annotation_es" class="form-item__input"><?= $item['annotation_es']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [fr]</span>
				<textarea name="annotation_fr" class="form-item__input"><?= $item['annotation_fr']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [hi]</span>
				<textarea name="annotation_hi" class="form-item__input"><?= $item['annotation_hi']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [id]</span>
				<textarea name="annotation_id" class="form-item__input"><?= $item['annotation_id']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [th]</span>
				<textarea name="annotation_th" class="form-item__input"><?= $item['annotation_th']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [tr]</span>
				<textarea name="annotation_tr" class="form-item__input"><?= $item['annotation_tr']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Аннотация [zh]</span>
				<textarea name="annotation_zh" class="form-item__input"><?= $item['annotation_zh']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [ru]</span>
				<textarea name="content_ru" class="form-item__input"><?= $contents_text['ru']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [en]</span>
				<textarea name="content_en" class="form-item__input"><?= $contents_text['en']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [de]</span>
				<textarea name="content_de" class="form-item__input"><?= $contents_text['de']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [pt]</span>
				<textarea name="content_pt" class="form-item__input"><?= $contents_text['pt']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [es]</span>
				<textarea name="content_es" class="form-item__input"><?= $contents_text['es']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [fr]</span>
				<textarea name="content_fr" class="form-item__input"><?= $contents_text['fr']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [hi]</span>
				<textarea name="content_hi" class="form-item__input"><?= $contents_text['hi']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [id]</span>
				<textarea name="content_id" class="form-item__input"><?= $contents_text['id']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [th]</span>
				<textarea name="content_th" class="form-item__input"><?= $contents_text['th']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [tr]</span>
				<textarea name="content_tr" class="form-item__input"><?= $contents_text['tr']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст новости [zh]</span>
				<textarea name="content_zh" class="form-item__input"><?= $contents_text['zh']; ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Только для админа [1/0]</span>
				<input class="form-item__input" type="text" name="admin_only" value="<?= $item['admin_only']; ?>">
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