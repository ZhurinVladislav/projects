<?php

if ($_POST['action'] == 'edit') {
	$section_id = $_POST['data']['id'];
	$text_en = trim(addslashes($_POST['data']['text_en']));
	$text_ru = trim(addslashes($_POST['data']['text_ru']));
	$text_de = trim(addslashes($_POST['data']['text_de']));
	$text_pt = trim(addslashes($_POST['data']['text_pt']));
	$text_es = trim(addslashes($_POST['data']['text_es']));
	
	$update_section = $pdo->prepare('UPDATE help_text SET text_en = ?, text_ru = ?, text_de = ?, text_pt = ?, text_es = ? WHERE id = ? LIMIT 1');
	if ($update_section->execute(array($text_en, $text_ru, $text_de, $text_pt, $text_es, $section_id))) {
		echo 1;
	}
}

if ($_POST['action'] == 'get_page') {
?>
<code>
	&lt;p&gt;Пример абзаца. Пример абзаца. Пример абзаца. Пример абзаца.&lt;/p&gt;
	<br>
	&lt;ul&gt;
	<br>
		&nbsp;&nbsp;&lt;li&gt;
		Пункт
		&lt;/li&gt;
		<br>
		&nbsp;&nbsp;&lt;li&gt;
		Пункт2
		&lt;/li&gt;
	<br>
	&lt;/ul&gt;
	<br>
	&lt;p&gt;Пример абзаца с переносом текста. Пример абзаца с переносом текста.&lt;br&gt;Пример абзаца с переносом текста. Пример абзаца с переносом текста.&lt;/p&gt;
	<br>
	&lt;a data-href="tutorial" data-template="main_inner"&gt;Ссылка на внутреннюю страницу&lt;/a&gt;
	<br>
	&lt;a data-href="news" data-template="main_external"&gt;Ссылка на внешнюю страницу&lt;/a&gt;
	<br>
	&lt;span colored&gt;Цветной текст.&lt;/span&gt;
	<br>
	Если ввести __money(4.1), то на страницу выведет 4.1000 <?= $coin; ?>
</code>
<?php
	$get_sections = $pdo->query('SELECT * FROM help_text');
	$sections = $get_sections->fetchAll();
	foreach ($sections as $item) {
?>

	<form class="form-default form-edit" data-page-handler="other/help_text" data-callback="paint-button">
		<br>
		<hr>
		<p class="description"><?= $item['name']; ?></p>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [en]</span>
				<textarea name="text_en" class="form-item__input"><?= stripslashes(htmlspecialchars_decode($item['text_en'])); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [ru]</span>
				<textarea name="text_ru" class="form-item__input"><?= stripslashes(htmlspecialchars_decode($item['text_ru'])); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [de]</span>
				<textarea name="text_de" class="form-item__input"><?= stripslashes(htmlspecialchars_decode($item['text_de'])); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [pt]</span>
				<textarea name="text_pt" class="form-item__input"><?= stripslashes(htmlspecialchars_decode($item['text_pt'])); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Текст [es]</span>
				<textarea name="text_es" class="form-item__input"><?= stripslashes(htmlspecialchars_decode($item['text_es'])); ?></textarea>
				<span class="form-item__description"></span>
			</label>
		</div>
		<br>
		<input type="hidden" name="id" value="<?= $item['id']; ?>">
		<button type="submit" class="button-d">Сохранить</button>
		<br><br>
	</form>

<?php
	}
}
?>