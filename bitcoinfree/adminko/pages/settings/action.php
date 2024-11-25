<?php
global $settings;
require_once '../classes/settings.php';

if ($_POST['action'] == 'edit') {

	$action_percent = $_POST['data']['action_percent'];
	$action_date_to = strtotime($_POST['data']['action_date_to']);
	$new_section = $_POST['data']['new_section'];
	$new_section_template = $_POST['data']['new_section_template'];

	$settings->update('action_percent', $action_percent);
	$settings->update('action_date_to', $action_date_to);
	$settings->update('new_section', $new_section);
	$settings->update('new_section_template', $new_section_template);

	echo 1;

}

if ($_POST['action'] == 'get_page') {

	$action_percent = $settings->get('action_percent');
	$action_date_to = $settings->get('action_date_to');
	$new_section = $settings->get('new_section');
	$new_section_template = $settings->get('new_section_template');
?>

<form class="form-default form-edit" data-page-handler="settings/action" data-callback="paint-button">
	<!-- <button type="button" class="button-d" data-open-form>Добавить</button> -->
	<div class="form-section">
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Процент</span>
				<input class="form-item__input" name="action_percent" value="<?= $action_percent; ?>">
				<span class="form-item__description">0 - акция выключина</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Дата окончания</span>
				<input class="form-item__input" type="datetime-local" name="action_date_to" value="<?php echo date('Y-m-d\TH:i', $action_date_to); ?>">
				<span class="form-item__description">Время по серверу</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Ссылка на раздел с обновлением</span>
				<input class="form-item__input" name="new_section" value="<?= $new_section; ?>" placeholder="bounty">
				<span class="form-item__description">Пустое поле - нету плашки New Update</span>
			</label>
		</div>
		<div class="form-item form-item-text">
			<label>
				<span class="form-item__header">Шаблон страницы</span>
				<span class="radio-button-group">
				<?php
					if ($new_section_template == 'main_inner') {
				?>
						<label><input type="radio" name="new_section_template" value="main_inner" checked>Внутренняя</label>
						<label><input type="radio" name="new_section_template" value="main_external">Внешняя</label>
				<?php
					} else {
				?>
						<label><input type="radio" name="new_section_template" value="main_inner">Внутренняя</label>
						<label><input type="radio" name="new_section_template" value="main_external" checked>Внешняя</label>
				<?php
					}
				?>	
				</span>
				<span class="form-item__description">Определяет шаблон страницы</span>
			</label>
		</div>
		<br><br>
		<button type="submit" class="button-d">Сохранить</button>
		<br><br>
		<hr>
	</div>
	<br><br>
</form>
<?php
}
?>