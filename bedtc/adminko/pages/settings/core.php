<?php

if ($_POST['action'] != 'get_page') {

} else {
?>
<p class="description">Основные настройки движка.</p>
<form class="form-default">
	<div class="form-item form-item-text">
		<label>
			<span class="form-item__header">Подпись</span>
			<input class="form-item__input" type="text" name="input_1">
			<span class="form-item__description">Описание настройки для предотвращения нещастных случаев. Описание настройки для предотвращения нещастных случаев. Описание настройки для предотвращения нещастных случаев</span>
		</label>
	</div>
	<div class="form-item form-item-text">
		<label>
			<span class="form-item__header">Подпись 2</span>
			<input class="form-item__input" type="text" name="input_2">
			<span class="form-item__description"></span>
		</label>
	</div>
	<br><br>
	<button type="submit" class="button-d">Сохранить</button>
</form>
<?php
}
?>